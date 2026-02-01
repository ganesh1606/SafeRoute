from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.safe_route import router as safe_router
from routes.smart_route import router as smart_router
from routes.heatmap import router as heatmap_router
from routes.danger_alerts import router as danger_router

app = FastAPI(title="SafeRoute API")

# ✅ CORS — THIS IS THE KEY FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://saferoute-e6bg.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ ROUTES
app.include_router(safe_router)
app.include_router(smart_router)
app.include_router(heatmap_router)
app.include_router(danger_router)

@app.get("/")
def root():
    return {"status": "SafeRoute backend running"}
