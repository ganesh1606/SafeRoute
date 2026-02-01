from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/safe-route", tags=["Safety"])

class Req(BaseModel):
    area: str
    crowd: str

@router.post("/")
def safe_route(data: Req):
    score = 40 if data.crowd == "medium" else 20
    level = "MODERATE" if score > 30 else "SAFE"
    return {
        "risk_score": score,
        "risk_level": level,
        "route_color": "YELLOW" if level == "MODERATE" else "GREEN"
    }
