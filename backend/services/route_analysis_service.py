import json, csv
from pathlib import Path

DATA = Path(__file__).parent.parent / "data"

def safe_load(path):
    try:
        return json.load(open(path))
    except:
        return {}

lighting = safe_load(DATA / "lighting_data.json")
cctv = safe_load(DATA / "cctv_data.json")
places = safe_load(DATA / "places_data.json")

crime = {}
try:
    with open(DATA / "crime_data.csv") as f:
        for r in csv.DictReader(f):
            crime[r["area"].lower()] = int(r["crime_score"])
except:
    pass

def score_route(area, time):
    a = area.lower()
    score = crime.get(a, 30)
    score += lighting.get(area, {}).get(time, 5)
    score -= cctv.get(area, 0) * 2
    score -= places.get(area, {}).get("hotels", 0) * 3
    score -= places.get(area, {}).get("shops", 0)

    level = "SAFE" if score < 25 else "MODERATE" if score < 55 else "UNSAFE"
    return {"risk_score": max(score, 0), "risk_level": level}
