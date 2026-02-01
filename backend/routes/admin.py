from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/stats")
def stats():
    return {
        "total_alerts": 34,
        "high_risk_zones": 5
    }
