import requests

def fetch_routes(src, dst):
    url = (
        f"http://router.project-osrm.org/route/v1/driving/"
        f"{src['lon']},{src['lat']};{dst['lon']},{dst['lat']}"
        "?alternatives=true&geometries=geojson"
    )

    data = requests.get(url).json()
    return data["routes"]
