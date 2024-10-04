import random
import uuid
from datetime import datetime, timedelta
import pytz

def ctime(wdm: str = "both"):
    # Define the timezone for Dhaka
    dhaka_tz = pytz.timezone('Asia/Dhaka')

    # Get the current time in Dhaka timezone
    now = datetime.now(dhaka_tz)
    dt_string = now.strftime("%d/%m/%y %H:%M:%S").split(" ")

    if wdm == "date":
        return dt_string[0]
    elif wdm == "time":
        return dt_string[1]
    else:
        return " ".join(dt_string)
def tdelta(start : str, end : str) -> str:


    time_format = "%d/%m/%y %H:%M:%S"

    time_str1 = start
    time_str2 = end

    time1 = datetime.strptime(time_str1, time_format)
    time2 = datetime.strptime(time_str2, time_format)

    time_delta = time2 - time1

    one_minute = timedelta(minutes=1)
    one_hour = timedelta(hours=1)
    one_day = timedelta(days=1)
    one_year = timedelta(days=365)

    if time_delta < one_minute:
        seconds = time_delta.total_seconds()
        return f"{seconds:.0f} seconds ago"
    elif time_delta < one_hour:
        minutes = time_delta.total_seconds() // 60
        return f"{minutes:.0f} minutes ago"
    elif time_delta < one_day:
        hours = time_delta.total_seconds() // 3600
        return f"{hours:.0f} hours ago"
    elif time_delta < one_year:
        days = time_delta.days
        return f"{days} days ago"
    else:
        years = time_delta.days // 365
        return f"{years} years ago"


def getToday():
    dhaka_tz = pytz.timezone('Asia/Dhaka')
    now = datetime.now(dhaka_tz)
    day_name = now.strftime("%A")

    return day_name

def uIdGen(cripStr : str):
    cripStr = cripStr.replace("@", "")
    cripStr = cripStr.replace(" ", "")
    cripStr = cripStr.replace(".", "")
    # print(cripStr)

    return "".join(random.choices(cripStr, k=10))
def getAccessToken():
    return str(uuid.uuid4())
def getTid(criperStr : str = "akjdhkjahsdjhajshdjh123qeoqwpeoqwie@asdax"):
    return "".join(random.choices(criperStr, k=10))

def addedTime(days : int, startTime : str = ctime("date")) -> str:
    date_str = startTime
    date_format = "%d/%m/%y"
    date_obj = datetime.strptime(date_str, date_format)
    new_date = date_obj + timedelta(days=days)
    return str(new_date.strftime(date_format))
def getUuid() -> str:
    return str(uuid.uuid4().hex)

def isExpired(expireDate : str):

    expire_date_str = expireDate

    expire_date = datetime.strptime(expire_date_str, "%d/%m/%y")

    current_date = datetime.now()

    if current_date > expire_date:
        return True
    else:
        return False


if __name__ == "__main__":
    # uIdGen("Salman Shariar 01232123223 example@gmail.com")
    print(ctime("date"))
    print(addedTime(10, "25/09/24"))
