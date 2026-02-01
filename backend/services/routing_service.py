import random

def get_routes(source, destination, mode):
    return [
        build_route(source, destination, mode, 1, "green", 0.18, 4.2),
        build_route(source, destination, mode, 2, "orange", 0.45, 3.6),
        build_route(source, destination, mode, 3, "red", 0.72, 3.1),
    ]

def build_route(source, destination, mode, seed, color, risk, distance):
    random.seed(seed)
    lat1, lon1 = source["lat"], source["lon"]
    lat2, lon2 = destination["lat"], destination["lon"]

    points = []
    for i in range(10):
        t = i / 9
        points.append({
            "lat": lat1 + (lat2 - lat1) * t + random.uniform(-0.001, 0.001),
            "lon": lon1 + (lon2 - lon1) * t + random.uniform(-0.001, 0.001),
        })

    speed = {"walk": 5, "cycle": 15, "car": 40}.get(mode, 40)
    eta = round((distance / speed) * 60, 1)

    return {
        "color": color,
        "risk": risk,
        "distance": distance,
        "eta": eta,
        "points": points
    }
