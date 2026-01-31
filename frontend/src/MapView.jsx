import {
    MapContainer,
    TileLayer,
    Polyline,
    CircleMarker,
    Marker
} from "react-leaflet";
import L from "leaflet";

const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [32, 32]
});

export default function MapView({ routes, dangerZones, userLocation }) {
    return (
        <MapContainer
            center={[userLocation.lat, userLocation.lon]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* User Location */}
            <Marker
                position={[userLocation.lat, userLocation.lon]}
                icon={userIcon}
            />

            {/* Routes */}
            {routes.map((r, i) => (
                <Polyline
                    key={i}
                    positions={r.geometry.coordinates.map(c => [c[1], c[0]])}
                    color={i === 0 ? "green" : "blue"}
                    weight={5}
                />
            ))}

            {/* Danger Zones */}
            {dangerZones.map((z, i) => (
                <CircleMarker
                    key={i}
                    center={[z.lat, z.lon]}
                    radius={10}
                    color={
                        z.risk === "high"
                            ? "red"
                            : z.risk === "medium"
                                ? "orange"
                                : "green"
                    }
                    fillOpacity={0.8}
                />
            ))}
        </MapContainer>
    );
}
