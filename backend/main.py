from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.routing_service import get_routes, reroute
from services.heatmap_service import get_heatmap
from services.alert_service import check_danger
from services.sos_service import trigger_sos

app = FastAPI(title="SafeRoute API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/routes")
def routes(payload: dict):
    return get_routes(payload)

@app.post("/reroute")
def reroute_api(payload: dict):
    return reroute(payload)

@app.post("/danger-alert")
def danger_alert(payload: dict):
    return check_danger(payload)

@app.get("/heatmap")
def heatmap():
    return get_heatmap()

@app.post("/sos")
def sos(payload: dict):
    return trigger_sos(payload)


