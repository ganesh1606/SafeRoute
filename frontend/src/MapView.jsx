import {
    MapContainer,
    TileLayer,
    Polyline,
    Marker
} from "react-leaflet";
import L from "leaflet";

const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [32, 32]
});

export default function MapView({ routes, activeIndex, user }) {
    return (
        <MapContainer
            center={[user.lat, user.lon]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={[user.lat, user.lon]} icon={userIcon} />

            {routes.map((r, i) => (
                <Polyline
                    key={i}
                    positions={r.geometry.coordinates.map(c => [c[1], c[0]])}
                    color={
                        i === activeIndex
                            ? "blue"
                            : r.risk_level === "SAFE"
                                ? "green"
                                : r.risk_level === "MODERATE"
                                    ? "orange"
                                    : "red"
                    }
                    weight={i === activeIndex ? 7 : 4}
                />
            ))}
        </MapContainer>
    );
}
