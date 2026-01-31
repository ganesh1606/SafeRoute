import csv, json, joblib
from pathlib import Path
from sklearn.ensemble import RandomForestClassifier

BASE = Path(__file__).parent.parent
DATA = BASE / "data"

# Load datasets
crime = {}
with open(DATA / "crime_data.csv") as f:
    for r in csv.DictReader(f):
        crime[r["area"]] = int(r["crime_score"])

lighting = json.load(open(DATA / "lighting_data.json"))
cctv = json.load(open(DATA / "cctv_data.json"))
places = json.load(open(DATA / "places_data.json"))

X = []
y = []

for area in crime:
    for time in ["day", "night"]:
        X.append([
            crime[area],
            lighting.get(area, {}).get(time, 5),
            cctv.get(area, 0),
            places.get(area, {}).get("hotels", 0),
            places.get(area, {}).get("shops", 0),
            1 if time == "night" else 0
        ])

        score = crime[area] + lighting.get(area, {}).get(time, 5)
        label = 0 if score < 25 else 1 if score < 50 else 2
        y.append(label)

model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X, y)

joblib.dump(model, BASE / "ml/safety_model.pkl")
print("✅ ML model trained & saved")
