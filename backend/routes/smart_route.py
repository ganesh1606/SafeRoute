from fastapi import APIRouter
from services.maps_service import fetch_routes
from services.route_analysis_service import score_route

router = APIRouter(prefix="/smart-route", tags=["AI Routing"])

@router.post("/")
def smart_route(data: dict):
    src = data["source"]
    dst = data["destination"]
    area = data["area"]
    time = data["time"]

    routes = fetch_routes(src, dst)

    results = []
    for r in routes:
        safety = score_route(area, time)
        results.append({
            "distance_km": round(r["distance"] / 1000, 2),
            "duration_min": round(r["duration"] / 60, 1),
            "geometry": r["geometry"],
            "risk_score": safety["risk_score"],
            "risk_level": safety["risk_level"]
        })

    return results
