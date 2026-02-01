from fastapi import APIRouter
import random

router = APIRouter(prefix="/heatmap", tags=["Heatmap"])

@router.get("/")
def get_heatmap():
    return [
        {
            "lat": 16.545 + random.uniform(-0.02, 0.02),
            "lon": 81.521 + random.uniform(-0.02, 0.02),
            "intensity": random.uniform(0.3, 1.0)
        }
        for _ in range(100)
    ]
