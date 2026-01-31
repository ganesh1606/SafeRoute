from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routes.safe_route import router as safe_router
from routes.routes_osrm import router as osrm_router

app = FastAPI(title="SafeRoute API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# serve danger_zones.json
app.mount("/static", StaticFiles(directory="."), name="static")

app.include_router(safe_router)
app.include_router(osrm_router)
