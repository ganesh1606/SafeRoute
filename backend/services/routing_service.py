import requests
from services.safety_service import score_route

OSRM = "https://router.project-osrm.org/route/v1"

def get_routes(payload):
    src = payload["source"]
    dst = payload["destination"]
    mode = payload.get("mode", "car")

    url = f"{OSRM}/{mode}/{src['lon']},{src['lat']};{dst['lon']},{dst['lat']}?alternatives=true&geometries=geojson"
    data = requests.get(url).json()

    routes = []
    for r in data.get("routes", [])[:3]:
        points = [{"lat": y, "lon": x} for x, y in r["geometry"]["coordinates"]]
        routes.append(score_route(points))

    return {"routes": routes}
