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
    output = []

    for r in routes:
        segments = []
        coords = r["geometry"]["coordinates"]

        for i in range(0, len(coords), 5):
            s = score_route(area, time)
            segments.append({
                "lat": coords[i][1],
                "lon": coords[i][0],
                "risk_level": s["risk_level"],
                "risk_score": s["risk_score"]
            })

        output.append({
            "distance_km": round(r["distance"] / 1000, 2),
            "duration_min": round(r["duration"] / 60, 1),
            "geometry": r["geometry"],
            "segments": segments
        })

    return output
