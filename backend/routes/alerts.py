from fastapi import APIRouter
from pydantic import BaseModel
import math

router = APIRouter(prefix="/alerts", tags=["Alerts"])

DANGERS = [
    {"lat": 16.547, "lon": 81.523},
    {"lat": 16.541, "lon": 81.518}
]

class Location(BaseModel):
    lat: float
    lon: float

@router.post("/")
def alerts(loc: Location):
    for d in DANGERS:
        if math.dist((d["lat"], d["lon"]), (loc.lat, loc.lon)) < 0.005:
            return {"alert": "⚠️ You are entering an unsafe area"}
    return {"alert": None}
