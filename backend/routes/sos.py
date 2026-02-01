from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/sos", tags=["SOS"])

class SOS(BaseModel):
    lat: float
    lon: float

@router.post("/")
def sos(data: SOS):
    return {
        "status": "SOS SENT",
        "location": data,
        "time": datetime.utcnow()
    }
