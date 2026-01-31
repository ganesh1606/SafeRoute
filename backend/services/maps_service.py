import requests

def fetch_routes(src_lat, src_lon, dst_lat, dst_lon):
    url = (
        f"http://router.project-osrm.org/route/v1/driving/"
        f"{src_lon},{src_lat};{dst_lon},{dst_lat}"
        "?alternatives=true&geometries=geojson&overview=full"
    )

    data = requests.get(url).json()

    routes = []
    for r in data["routes"]:
        routes.append({
            "distance_km": round(r["distance"] / 1000, 2),
            "duration_min": round(r["duration"] / 60, 1),
            "geometry": r["geometry"]
        })

    return routes
