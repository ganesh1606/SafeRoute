import csv, json, math
from pathlib import Path

DATA = Path(__file__).parent.parent / "data"

crime = {}
with open(DATA / "crime_data.csv") as f:
    reader = csv.DictReader(f)
    for r in reader:
        crime[r["area"].lower()] = int(r["crime_score"])

lighting = json.load(open(DATA / "lighting_data.json"))
try:
    cctv = json.load(open(DATA / "cctv_data.json"))
except Exception as e:
    print("⚠️ CCTV data load failed:", e)
    cctv = {}
places = json.load(open(DATA / "places_data.json"))

def score_route(area, time):
    crime_score = crime.get(area.lower(), 30)
    light_score = lighting.get(area, {}).get(time, 5)
    cctv_score = cctv.get(area, 0) * -2
    hotel_score = places.get(area, {}).get("hotels", 0) * -3
    shop_score = places.get(area, {}).get("shops", 0) * -1

    total = crime_score + light_score + cctv_score + hotel_score + shop_score

    level = (
        "SAFE" if total < 25 else
        "MODERATE" if total < 55 else
        "UNSAFE"
    )

    return {
        "risk_score": max(total, 0),
        "risk_level": level
    }
