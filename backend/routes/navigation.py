from fastapi import APIRouter
from pydantic import BaseModel
import math

router = APIRouter(prefix="/navigate", tags=["Navigation"])

class Nav(BaseModel):
    source: dict
    destination: dict

@router.post("/")
def navigate(data: Nav):
    dx = data.destination["lat"] - data.source["lat"]
    dy = data.destination["lon"] - data.source["lon"]

    distance_km = math.sqrt(dx*dx + dy*dy) * 111
    eta_min = int(distance_km / 30 * 60)

    return {
        "distance_km": round(distance_km, 2),
        "eta_min": eta_min,
        "route": [
            [data.source["lat"], data.source["lon"]],
            [data.destination["lat"], data.destination["lon"]]
        ]
    }
