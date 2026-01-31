from datetime import datetime

def get_time_of_day():
    hour = datetime.now().hour
    return "day" if 6 <= hour < 18 else "night"
