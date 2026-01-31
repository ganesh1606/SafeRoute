from fastapi import APIRouter
from pydantic import BaseModel
from services.safety_service import calculate_safety

router = APIRouter(prefix="/safe-route", tags=["Safety"])

class SafeRouteRequest(BaseModel):
    area: str
    crowd: str

@router.post("/")
def get_safe_route(req: SafeRouteRequest):
    return calculate_safety(req.area, req.crowd)
