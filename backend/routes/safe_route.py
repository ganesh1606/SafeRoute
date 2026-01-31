from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/safe-route", tags=["Safety"])

class SafeRouteRequest(BaseModel):
    area: str
    crowd: str

@router.post("/")
def get_safe_route(data: SafeRouteRequest):
    risk_score = 40 if data.crowd == "medium" else 20
    risk_level = "MODERATE" if risk_score > 30 else "SAFE"

    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "route_color": "YELLOW" if risk_level == "MODERATE" else "GREEN"
    }
