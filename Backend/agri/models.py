from enum import unique

from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Text,TypeDecorator
import json
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):

    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    uId = Column(String(50), unique=True)
    fullName = Column(String(100), unique=False, nullable=False)
    phoneNumber = Column(String(20), unique=True, nullable=False)
    email = Column(String(100), unique=False, nullable=False)
    currentLocation =Column(String(100), unique=False, nullable=True)
    accountStatus = Column(String(20), unique=False, nullable=True, default="active") #["active", "blocked", "timedOut"]
    accessToken = Column(String(100), unique=True, nullable=False)
    accountCreationIp = Column(String(100), unique=False, nullable=True)
    clientDeviceInfo = Column(String(300), unique=False, nullable=True)
    lastAccessedIp = Column(String(100), unique=False, nullable=True)
    creationTime = Column(String(200), unique=False, nullable=True)
    fields = Column(Text, unique=False, nullable=True, default="[]")

class ApiToken(Base):
    __tablename__ = 'apiToken'
    id = Column(Integer, primary_key=True)
    uId = Column(String(50), unique=True)
    creationTime = Column(String(100), nullable=True)
    tokenStr = Column(String(100), unique=True, nullable=False)
    expireTime = Column(String(100), nullable=True)
    threshold = Column(Integer, nullable=False, default=60) #per 60 seconds
    tokenLevel = Column(Integer, nullable=False, default=3)
    requestLimit = Column(Integer, nullable=False, default=10000)
    useCount = Column(Integer, nullable=False, default=0)


class aiResponse(Base):
    __tablename__ = 'aiResponse'
    id = Column(Integer, primary_key=True)
    accessToken = Column(String(100), unique=False, nullable=False)
    chatId = Column(String(100), unique=False, nullable=True)
    creationTime = Column(String(200), unique=False, nullable=True)
    promptStr = Column(String(1000), unique=False, nullable=True)

class Sensors(Base):
    __tablename__ = 'sensors'
    id = Column(Integer, primary_key=True)
    uId = Column(String(50), unique=True)
    accessToken = Column(String(100), unique=True, nullable=False)
    sensorName = Column(String(100), unique=False, nullable=True)
    status = Column(String(50), unique=False, nullable=True, default="off")
    fieldId = Column(String(50), unique=False, nullable=True)



class JSONEncodedDict(TypeDecorator):
    """Custom type for automatically serializing and deserializing JSON strings."""
    impl = Text

    def process_bind_param(self, value, dialect):
        """Convert Python dict to JSON string before storing in the database."""
        if value is None:
            return None
        return json.dumps(value)

    def process_result_value(self, value, dialect):
        """Convert JSON string back to Python dict after retrieving from the database."""
        if value is None:
            return None
        return json.loads(value)

# Now use this custom type in your model
class SensorData(Base):
    __tablename__ = 'sensordata'

    id = Column(Integer, primary_key=True)
    sensorId = Column(String(50), unique=False, index=True)
    accessToken = Column(String(100), unique=False, nullable=False)
    information = Column(Text, unique=False, nullable=True)
    sensorData = Column(JSONEncodedDict, unique=False, nullable=True)  # Use custom type
    lastUpdatedTime = Column(String(200), unique=False, nullable=True)
    fieldId = Column(String(50), unique=False, nullable=True)


class Fields(Base):
    __tablename__ = 'fields'
    id = Column(Integer, primary_key=True)
    uId = Column(String(50), unique=True, index=True)
    cropType = Column(String(50), unique=False, nullable=True)
    width = Column(Float, unique=False, nullable=True)
    height = Column(Float, unique=False, nullable=True)
    accessToken = Column(String(100), unique=False, nullable=True)
    fieldName = Column(String(100), unique=False, nullable=False)



