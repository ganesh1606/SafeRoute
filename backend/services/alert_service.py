from services.safety_service import danger_at

def check_danger(payload):
    lat = payload["lat"]
    lon = payload["lon"]

    d = danger_at(lat, lon)
    risk = (
        d["crime"] * 0.4 +
        (1 - d["lights"]) * 0.25 +
        (1 - d["cctv"]) * 0.2 +
        (1 - d["crowd"]) * 0.15
    )

    if risk > 0.6:
        return {
            "alert": True,
            "level": "HIGH",
            "message": "Dangerous area ahead"
        }

    return {"alert": False}
