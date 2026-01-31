import {
    MapContainer,
    TileLayer,
    Polyline,
    CircleMarker
} from "react-leaflet";

export default function MapView({ routes = [], dangerZones = [] }) {
    return (
        <MapContainer
            center={[16.545, 81.521]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {routes.map((r, i) => (
                <Polyline
                    key={i}
                    positions={r.geometry.coordinates.map(c => [c[1], c[0]])}
                    color={i === 0 ? "green" : "blue"}
                    weight={5}
                />
            ))}

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
