from fastapi import APIRouter
from services.maps_service import fetch_routes

router = APIRouter(prefix="/routes", tags=["Routing"])

@router.get("/")
def get_routes(src_lat: float, src_lon: float, dst_lat: float, dst_lon: float):
    return fetch_routes(src_lat, src_lon, dst_lat, dst_lon)
