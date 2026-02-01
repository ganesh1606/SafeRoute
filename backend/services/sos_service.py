def trigger_sos(payload):
    return {
        "status": "sent",
        "lat": payload["lat"],
        "lon": payload["lon"],
        "message": "Emergency! User needs help."
    }
