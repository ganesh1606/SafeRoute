from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.smart_route import router as smart_router

app = FastAPI(title="SafeRoute AI Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(smart_router)
