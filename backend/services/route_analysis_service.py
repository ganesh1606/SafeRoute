import csv, json, joblib
from pathlib import Path

BASE = Path(__file__).parent.parent
DATA = BASE / "data"
MODEL = BASE / "ml/safety_model.pkl"

model = joblib.load(MODEL)

crime = {}
with open(DATA / "crime_data.csv") as f:
    for r in csv.DictReader(f):
        crime[r["area"]] = int(r["crime_score"])

lighting = json.load(open(DATA / "lighting_data.json"))
cctv = json.load(open(DATA / "cctv_data.json"))
places = json.load(open(DATA / "places_data.json"))

def predict_route_safety(area, time):
    features = [[
        crime.get(area, 30),
        lighting.get(area, {}).get(time, 5),
        cctv.get(area, 0),
        places.get(area, {}).get("hotels", 0),
        places.get(area, {}).get("shops", 0),
        1 if time == "night" else 0
    ]]

    pred = model.predict(features)[0]

    levels = ["SAFE", "MODERATE", "UNSAFE"]

    return {
        "risk_level": levels[pred],
        "risk_score": int(pred * 35 + 15)
    }
