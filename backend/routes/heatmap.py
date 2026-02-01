from fastapi import APIRouter
import random

router = APIRouter(prefix="/heatmap", tags=["Heatmap"])

@router.get("/")
def heatmap():
    return [
        {
            "lat": 16.545 + random.uniform(-0.03, 0.03),
            "lon": 81.521 + random.uniform(-0.03, 0.03),
            "intensity": random.uniform(0.3, 1)
        }
        for _ in range(120)
    ]
