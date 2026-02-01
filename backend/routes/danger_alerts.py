from fastapi import APIRouter
from pydantic import BaseModel
import math

router = APIRouter(prefix="/danger-alerts", tags=["Alerts"])

DANGER_ZONES = [
    {"lat": 16.547, "lon": 81.523, "level": "HIGH"},
    {"lat": 16.541, "lon": 81.519, "level": "MEDIUM"}
]

class Location(BaseModel):
    lat: float
    lon: float

def distance(a, b):
    return math.sqrt((a["lat"]-b.lat)**2 + (a["lon"]-b.lon)**2)

@router.post("/")
def check_danger(loc: Location):
    alerts = []
    for z in DANGER_ZONES:
        if distance(z, loc) < 0.005:
            alerts.append({
                "level": z["level"],
                "message": "⚠️ Approaching unsafe area"
            })
    return alerts
