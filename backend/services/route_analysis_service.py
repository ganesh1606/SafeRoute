import csv
import json
from pathlib import Path

DATA = Path(__file__).parent.parent / "data"

def safe_json_load(path):
    try:
        with open(path, "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"⚠️ Failed to load {path.name}: {e}")
        return {}

# Load data safely
crime = {}
try:
    with open(DATA / "crime_data.csv") as f:
        reader = csv.DictReader(f)
        for r in reader:
            crime[r["area"].lower()] = int(r["crime_score"])
except Exception as e:
    print("⚠️ Crime data load failed:", e)

lighting = safe_json_load(DATA / "lighting_data.json")
cctv = safe_json_load(DATA / "cctv_data.json")
places = safe_json_load(DATA / "places_data.json")

def score_route(area, time):
    area_l = area.lower()

    crime_score = crime.get(area_l, 30)
    light_score = lighting.get(area, {}).get(time, 5)
    cctv_score = cctv.get(area, 0) * -2
    hotel_score = places.get(area, {}).get("hotels", 0) * -3
    shop_score = places.get(area, {}).get("shops", 0) * -1

    total = crime_score + light_score + cctv_score + hotel_score + shop_score

    if total < 25:
        level = "SAFE"
    elif total < 55:
        level = "MODERATE"
    else:
        level = "UNSAFE"

    return {
        "risk_score": max(total, 0),
        "risk_level": level
    }
