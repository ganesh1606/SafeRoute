from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.routing_service import get_routes

app = FastAPI(title="SafeRoute API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "SafeRoute backend running"}

@app.post("/routes")
def routes(payload: dict):
    source = payload.get("source")
    destination = payload.get("destination")
    mode = payload.get("mode", "car")

    if not source or not destination:
        return {"error": "Source or destination missing"}

    return {"routes": get_routes(source, destination, mode)}
