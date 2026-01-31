import { MapContainer, TileLayer, Polyline } from "react-leaflet";

export default function MapView({ routes }) {
    return (
        <MapContainer center={[16.545, 81.521]} zoom={13} style={{ height: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {routes.map((r, i) => (
                <Polyline
                    key={i}
                    positions={r.geometry.coordinates.map(c => [c[1], c[0]])}
                    color={
                        r.risk_level === "SAFE" ? "green" :
                            r.risk_level === "MODERATE" ? "orange" : "red"
                    }
                    weight={6}
                />
            ))}
        </MapContainer>
    );
}
