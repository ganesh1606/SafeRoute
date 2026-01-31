from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.safe_route import router as safe_router
from routes.smart_route import router as smart_router   # ✅ ADD THIS

app = FastAPI(title="SafeRoute API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(safe_router)
app.include_router(smart_router)   # ✅ ADD THIS
