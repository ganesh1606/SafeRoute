from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/reports", tags=["Crowd Reports"])

reports = []

class Report(BaseModel):
    lat: float
    lon: float
    type: str
    description: str = ""

@router.post("/")
def add_report(data: Report):
    report = {
        "lat": data.lat,
        "lon": data.lon,
        "type": data.type,
        "description": data.description,
        "time": datetime.utcnow().isoformat()
    }
    reports.append(report)
    return report

@router.get("/")
def get_reports():
    return reports
