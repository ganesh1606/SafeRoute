from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/sos", tags=["Emergency"])

alerts = []

class SOS(BaseModel):
    lat: float
    lon: float
    message: str = "Emergency"

@router.post("/")
def send_sos(data: SOS):
    alert = {
        "lat": data.lat,
        "lon": data.lon,
        "message": data.message,
        "time": datetime.utcnow().isoformat()
    }
    alerts.append(alert)
    return {"status": "sent", "alert": alert}

@router.get("/")
def get_alerts():
    return alerts
