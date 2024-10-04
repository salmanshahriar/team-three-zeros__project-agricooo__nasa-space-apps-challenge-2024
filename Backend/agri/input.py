from pydantic import BaseModel, field_validator

class accountCreationInfo(BaseModel):
    fullName: str
    phoneNumber: str
    email : str | None = None
    clientDeviceInfo : str | None = None
    accountCreationIp : str | None = None

    # @field_validator("phoneNumber")
    # def validate_phoneNumber(cls, value: str):
    #     if not value.isdigit() or len(value) != 11 or not value.startswith("01"):
    #         raise ValueError("provide a valid phone number")
    #     return value
    # @field_validator("email")
    # def validate_email(cls, value: str):
    #     if value is None:
    #         return None
    #     if not value.count("@") == 1 or not len(value.split("@")) > 1:
    #         raise ValueError("provide a valid email address")
    #     else:
    #         return value

class aiReplyInput(BaseModel):
    prompt : str
    chatId : str | None = None
    accessToken : str
    apiToken : str

class seekUserInfo(BaseModel):
    accessToken: str

class updateLocationInput(BaseModel):
    accessToken: str
    longitude: float
    latitude: float

class getFieldDetailsInput(BaseModel):
    accessToken: str


class getAiCommentInput(BaseModel):
    accessToken: str
    context : str
    apiToken : str
class addFieldInput(BaseModel):
    accessToken: str
    width : float | int
    height : float | int
    cropType : str | None = None
    fieldName : str
class addSensorInput(BaseModel):
    accessToken: str
    sensorName : str
    fieldId : str

class recoverAccessTokenInput(BaseModel):
    phoneNumber : str
    otpCode : int

class SensorDataPush(BaseModel):
    accessToken: str
    sensorId: str
    information: str | None = None
    sensorData: dict

class SensorDataSeek(BaseModel):
    accessToken: str
    sensorId: str

