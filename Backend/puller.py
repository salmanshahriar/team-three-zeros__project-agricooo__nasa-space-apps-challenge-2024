import os
import time

while True:
    os.system(f"cd {os.getcwd()} && git pull")
    time.sleep(10)