from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.navigation import router as nav
from routes.heatmap import router as heatmap
from routes.alerts import router as alerts
from routes.sos import router as sos
from routes.admin import router as admin

app = FastAPI(title="SafeRoute v2 API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(nav)
app.include_router(heatmap)
app.include_router(alerts)
app.include_router(sos)
app.include_router(admin)

@app.get("/")
def root():
    return {"status": "SafeRoute v2 running"}
