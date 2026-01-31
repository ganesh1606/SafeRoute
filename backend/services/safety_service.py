import csv
import json
from pathlib import Path
from utils.time_utils import get_time_of_day

DATA_DIR = Path(__file__).parent.parent / "data"

# Load crime data
CRIME_DATA = {}
with open(DATA_DIR / "crime_data.csv", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        CRIME_DATA[row["area"].lower()] = int(row["crime_score"])

# Load lighting data
with open(DATA_DIR / "lighting_data.json") as f:
    LIGHTING_DATA = json.load(f)


def calculate_safety(area: str, crowd: str):
    time = get_time_of_day()

    crime_score = CRIME_DATA.get(area.lower(), 20)
    lighting_score = LIGHTING_DATA.get(area, {}).get(time, 5)

    crowd_factor = {
        "low": 1,
        "medium": 1.5,
        "high": 2
    }.get(crowd, 1)

    risk_score = int((crime_score + lighting_score) * crowd_factor)

    if risk_score <= 30:
        level, color = "SAFE", "GREEN"
    elif risk_score <= 60:
        level, color = "MODERATE", "YELLOW"
    else:
        level, color = "UNSAFE", "RED"

    return {
        "area": area,
        "time": time,
        "risk_score": risk_score,
        "risk_level": level,
        "route_color": color
    }
