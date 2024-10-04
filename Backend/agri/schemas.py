from pydantic import BaseModel


class LocationInfo(BaseModel):
    latitude: float
    longitude: float
