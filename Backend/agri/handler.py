if __name__ == "__main__":
    import schemas as Schemas
    from sens import *

else:
    from agri.sens import *
    import agri.schemas as Schemas

from fastapi.responses import HTMLResponse
from markdown2 import markdown

import google.generativeai as genai
import os
import requests
proxies = {
    'http': 'http://101.251.204.174:8080'
}


def getWeather(locationInfo : Schemas.LocationInfo):
    # print(locationData.model_dump_json())
    WEATHER_API = f"""https://api.weatherapi.com/v1/forecast.json?key=ff9b41622f994b1287a73535210809&q={locationInfo.latitude},{locationInfo.longitude}&days=3"""
    response = requests.get(WEATHER_API, proxies=proxies)

    if response.status_code == 200:
        return response.json()
    else:
        return response.json()

# def nameToLocationInfo(locationName : str):
#
def gemResponse(prompt : str = None):


    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return markdown(response.text)
if __name__ == '__main__':
    gemResponse()