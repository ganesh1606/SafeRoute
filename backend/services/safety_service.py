import math

def danger_at(lat, lon):
    seed = abs(math.sin(lat * lon * 1000))
    return {
        "crime": seed,
        "lights": 1 - seed * 0.7,
        "cctv": 0.5 + seed * 0.5,
        "crowd": 0.3 + seed * 0.6,
    }

def score_route(points):
    total = 0
    for p in points:
        d = danger_at(p["lat"], p["lon"])
        total += (
            d["crime"] * 0.4 +
            (1 - d["lights"]) * 0.25 +
            (1 - d["cctv"]) * 0.2 +
            (1 - d["crowd"]) * 0.15
        )

    risk = total / len(points)
    color = "green" if risk < 0.35 else "orange" if risk < 0.6 else "red"

    return {
        "points": points,
        "risk": risk,
        "color": color
    }
