from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.safe_route import router as safe_router
from routes.smart_route import router as smart_router
from routes.sos import router as sos_router
from routes.reports import router as reports_router
from routes.heatmap import router as heatmap_router

app = FastAPI(title="SafeRoute API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(safe_router)
app.include_router(smart_router)
app.include_router(sos_router)
app.include_router(reports_router)
app.include_router(heatmap_router)
