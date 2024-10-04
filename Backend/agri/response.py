from pydantic import BaseModel
from typing import Literal

import agri.constants as Constants


class WelcomeMessage(BaseModel):
    message : str = "welcome to agricooo"
    versionNo : float = Constants.versionNo
    version : str = Constants.version

class ErrorMessage(BaseModel):
    errorType : str | None = "warning"
    errorMessage : str | None = "something went wrong"
    errorCode : int | None = 0
class FlashMessage(BaseModel):
    message : str = "Something went wrong"
    info : dict | None = {}
    category : Literal["info", "error", "success", "warning"] | None  = "info"

class aiTextResponse(BaseModel):
    replyStr : str = "no reply given"
    chatId : str | None = None

class newSuccessAccount(BaseModel):
    status : str | None = "failed"
    accessToken : str | None = "null"
    apiToken : str | None = "null"
class UserinfoResponse(BaseModel):
    fullName : str
    email : str
    phoneNumber: str
    currentLocation : str | None = None

class SensorDataResponse(BaseModel):
    responseTime : str
    sensorData : dict
