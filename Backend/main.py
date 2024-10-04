import json
from email.policy import default
from typing import Tuple
from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from agri.input import SensorDataPush
from agri.models import Base, User, ApiToken, aiResponse, Sensors, Fields, SensorData
from agri.program import *

import agri.response as Response
import agri.models as Models
import agri.handler as Handler
import agri.constants as Constants
import agri.schemas as Schemas
import agri.input as InputSchemas

from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SQLALCHEMY_DATABASE_URL = "sqlite:///./database/agricooo.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def userVerify(accessToken : str, db: Depends(get_db)) -> Tuple[bool, str]:
    userInfo = db.query(User).filter(User.accessToken == accessToken).first()
    if userInfo is None:
        print(f"User not found")
        return False
    if userInfo.accountStatus != "active":
        print(f"Account not active")
        return False
    return True

def tokenCreation(db: Depends(get_db), **kwargs) -> Tuple[bool, str]:
    try:
        tokenQuant = kwargs
        expireTime = addedTime(tokenQuant.get("expireTime", 10))
        uId = tokenQuant.get("uId", "system")
        tokenStr = getAccessToken()
        newToken = ApiToken(
            expireTime=expireTime,
            uId=uId,
            tokenStr=tokenStr,
            creationTime=ctime("date")
        )
        db.add(newToken)
        db.commit()
        return True, tokenStr
    except Exception as error:
        print(error)
        db.rollback()
    finally:
        db.close()
    return False, "token not created"


def tokenVerify(apiToken : str, db: Depends(get_db)) -> Tuple[bool, str]:
    tokenInfo = db.query(ApiToken).filter(ApiToken.tokenStr == apiToken).first()
    if tokenInfo is None:
        return False, "token not found"
    if tokenInfo.useCount > tokenInfo.requestLimit:
        return False, "token is exceeded its limit"
    if isExpired(tokenInfo.expireTime):
        return False, "token is expired"
    tokenInfo.useCount+=1
    db.commit()
    return True, "valid token"

class UserInfo:
    def __init__(self, accessToken : str, db: Depends(get_db)) -> None:
        self.givenAccessToken = accessToken
        self.getUserDetails(db)
    def getUserDetails(self, db: Depends(get_db)):
        userinfo = db.query(User).filter(User.accessToken == self.givenAccessToken).first()
        # print(userinfo.fields)
        self.fullName = userinfo.fullName
        self.email = userinfo.email
        self.accessToken = userinfo.accessToken
        self.phoneNumber = userinfo.phoneNumber
        self.fields = userinfo.fields


@app.get("/")
async def root():
    return Response.WelcomeMessage()

@app.post("/createAccount")
async def createAccount(newUserInfo : InputSchemas.accountCreationInfo, db: Session = Depends(get_db)):
    checkExist = db.query(User).filter(User.phoneNumber == newUserInfo.phoneNumber).first()
    if checkExist:
        return Response.FlashMessage(message="account already exists with this phone number", category="warning")
    try:
        uId = uIdGen(newUserInfo.fullName + newUserInfo.email + newUserInfo.phoneNumber)
        accessToken = getAccessToken()
        newUser = User(uId=uId, accessToken=accessToken, **newUserInfo.model_dump())
        db.add(newUser)
        try:
            db.commit()
            tokenCreated, tokenStr = tokenCreation(db, uId=uId)
            # return Response.FlashMessage(message=f"account created {tokenStr}", category="success")
            return Response.newSuccessAccount(status="success", accessToken=accessToken, apiToken=tokenStr)
        except Exception as error:
            return Response.ErrorMessage(errorMessage=f"database error {error}", errorType="error", errorCode=1)
    except Exception as error:
        return Response.ErrorMessage(errorMessage="something went wrong. account creation failed", errorType=f"{error}", errorCode=1)
@app.post("/getWeather")
async def get_weather(locationInfo : Schemas.LocationInfo):
    return Handler.getWeather(locationInfo)



@app.post("/chatWithAi")
async def getReply(promptInfo : InputSchemas.aiReplyInput, db: Session = Depends(get_db)):
    if userVerify(promptInfo.accessToken, db):
        tVerify, tMessage = tokenVerify(promptInfo.apiToken, db)
        userinfo = UserInfo(promptInfo.accessToken, db)
        if not tVerify:
            return Response.ErrorMessage(errorMessage=tMessage, errorType="error", errorCode=1)

        if promptInfo.chatId == None:
            chats = ""
        else:
            chats = db.query(aiResponse).filter(aiResponse.chatId == promptInfo.chatId).all()
        currentPrompt = promptInfo.prompt
        if len(chats) == 0:
            newChatId : str= getUuid()
            promptInfo.chatId = newChatId
        else:
            promptHistory : list = []
            for i in chats:
                promptHistory.append(i.promptStr)

            promptHistory = list(set(promptHistory))
            promptInfo.prompt = "\n".join(promptHistory)
            # print(promptHistory)
        promptInfo.prompt = f"My name {userinfo.fullName.split('  ')[0]}\n" + promptInfo.prompt
        print(promptInfo.prompt)
        aiReply : str = Handler.gemResponse(promptInfo.prompt)
        newAiResponse = aiResponse(
            accessToken=promptInfo.accessToken,
            chatId=promptInfo.chatId,
            creationTime=ctime("both"),
            promptStr= currentPrompt
        )
        db.add(newAiResponse)
        db.commit()
        return Response.aiTextResponse(replyStr=aiReply, chatId=promptInfo.chatId)
    else:
        return Response.ErrorMessage(errorMessage="invalid access token", errorType="error", errorCode=99)
@app.get("/getLanguagePack")
async def getInnerContent(language :str = "en"):

    if language not in ["en", "bn"]:
        return Response.ErrorMessage(errorMessage="invalid language", category="warning")
    else:
        return json.loads(open(f"languages/{language}.json", "r").read())

@app.post("/userInfo")
async def getUserinfo(acToken: InputSchemas.seekUserInfo, db: Session = Depends(get_db)):
    if userVerify(acToken.accessToken, db):
        checkExist = db.query(User).filter(User.accessToken == acToken.accessToken).first()
        if checkExist:
            return Response.UserinfoResponse(**checkExist.__dict__)
        else:
            return Response.FlashMessage(message="account does not exist", category="warning")
    else:
        return Response.ErrorMessage(errorMessage="invalid access token", category="warning")

@app.post("/updateLocation")
async def updateLocation(newLocationInfo : InputSchemas.updateLocationInput, db: Session = Depends(get_db)):
    if userVerify(newLocationInfo.accessToken, db):
        userInfo = db.query(User).filter(User.accessToken == newLocationInfo.accessToken).first()
        newLocation = f"{newLocationInfo.longitude},{newLocationInfo.latitude}"
        userInfo.location = newLocation
        try:
            db.commit()
            return Response.FlashMessage(message="location updated", category="success")
        except Exception as error:
            return Response.ErrorMessage(errorMessage=error, errorType="error", errorCode=1)
    else:
        return Response.FlashMessage(message="invalid access token", category="warning")

@app.post("/getFieldDetails")
async def getFieldDetails(fieldSeek : InputSchemas.getFieldDetailsInput, db: Session = Depends(get_db)):
    if userVerify(fieldSeek.accessToken, db):
        userinfo = db.query(User).filter(User.accessToken == fieldSeek.accessToken).first()
        sensorList = db.query(Sensors).filter(Sensors.accessToken == fieldSeek.accessToken).all()
        fieldData = []
        for i in json.loads(userinfo.fields):
            fieldAllSensor = []
            for z in sensorList:
                if z.fieldId == i:
                    fieldAllSensor.append(z.uId)

            fieldWSensor = {
                'field_uid' : i,
                'sensor_list' : fieldAllSensor
            }
            fieldData.append(fieldWSensor)

        return fieldData
    else:
        return Response.FlashMessage(message="invalid access token", category="warning")


@app.post("/getAiComment")
async def getAiComment(aiCommentSeek : InputSchemas.getAiCommentInput, db: Session = Depends(get_db)):
    if userVerify(aiCommentSeek.accessToken, db):
        tVerify, tMessage = tokenVerify(aiCommentSeek.apiToken, db)
        if tVerify:
            aiCommentSeek.context+= "\n Reply in one sentence."
            aiComment : str = Handler.gemResponse(aiCommentSeek.context)
            return {
                "comment" : aiComment
            }

        else:
            return Response.ErrorMessage(errorMessage=tMessage, category="warning")

    else:
        return Response.FlashMessage(message="invalid access token", category="warning")




@app.post("/addField")
async def addField(fieldInfo : InputSchemas.addFieldInput, db: Session = Depends(get_db)):
    if userVerify(fieldInfo.accessToken, db):
        try:
            field_uid = getTid("ahdkjahs123123")
            userinfo = db.query(User).filter(User.accessToken == fieldInfo.accessToken).first()
            userinfo.fields = json.loads(userinfo.fields)
            userinfo.fields.append(field_uid)
            userinfo.fields = json.dumps(userinfo.fields)
            newFieldData = Fields(
                uId = field_uid,
                **fieldInfo.model_dump()
            )

            db.add(newFieldData)
            db.commit()
            return Response.FlashMessage(message="field added", category="success", info={
                "fieldId" : field_uid,
            })
        except Exception as error:
            return Response.ErrorMessage(errorMessage=f"{error}", errorType="error", errorCode=1)


    else:
        return Response.ErrorMessage(errorMessage="invalid access token", category="warning")

@app.post("/addSensor")
async def addSensor(newSensorDetails : InputSchemas.addSensorInput, db: Session = Depends(get_db)):
    if userVerify(newSensorDetails.accessToken, db):
        try:
            newSensorId = getTid("ahdkjahs123123")
            newSensor = Sensors(
                uId = newSensorId,
                **newSensorDetails.model_dump()
            )
            db.add(newSensor)
            db.commit()
            return Response.FlashMessage(message=f"sensor_added_id_{newSensorId}", category="success")
        except Exception as error:
            return Response.ErrorMessage(errorMessage=f"{error}", errorType="error", errorCode=1)

    else:
        return Response.FlashMessage(message="invalid access token", category="warning")
@app.post("/recoverAccessToken")
async def recoverAccessToken(userInfo : InputSchemas.recoverAccessTokenInput, db: Session = Depends(get_db)):
    lostUser = db.query(User).filter(User.phoneNumber == userInfo.phoneNumber).first()
    if lostUser is None:
        return Response.FlashMessage(message="User doesn't exist or didn't demand any recover requests to server", category="warning")
    else:
        if userInfo.otpCode == 99:
            return Response.FlashMessage(message=f"recover successful", category="warning", info={
                "accessToken" : lostUser.accessToken
            })
        else:
            return Response.FlashMessage(message=f"invalid otp", category="warning", info={})

@app.post("/sensorDataPush")
async def pushSensorData(sensorData : InputSchemas.SensorDataPush, db: Session = Depends(get_db)):
    if userVerify(sensorData.accessToken, db):
        
        try:
            newSensorData = SensorData(
            lastUpdatedTime = ctime("both"),
            **sensorData.model_dump()
            )
            db.add(newSensorData)
            db.commit()
            return Response.FlashMessage(message=f"sensor_data_pushed_into_{sensorData.sensorId}", category="success", info={
                "sensorId" : sensorData.sensorId
            })
        except Exception as error:
            return Response.ErrorMessage(errorMessage=f"{error}", errorType="error", errorCode=1)
        
    else:
        return Response.ErrorMessage(errorMessage="invalid access token", category="warning")
@app.post("/getSensorData")
async def getSensorData(sensorSeek: InputSchemas.SensorDataSeek, db: Session = Depends(get_db)):
    if userVerify(sensorSeek.accessToken, db):
        sensorData = db.query(SensorData).filter(SensorData.sensorId == sensorSeek.sensorId).first()

        sensorDataObject = {}
        sensorDataObject.update(sensorData.sensorData)
        return Response.SensorDataResponse(responseTime=ctime("both"), sensorData=sensorDataObject)


    else:
        return Response.FlashMessage(message="invalid access token", category="warning")
