import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    Circle
} from "react-leaflet";
import { useEffect, useRef } from "react";

const DEFAULT = [16.545, 81.521];

export default function MapView({ user, destination, routes, heatmap }) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current && destination) {
            mapRef.current.setView(
                [destination.lat, destination.lon],
                14
            );
        }
    }, [destination]);

    return (
        <MapContainer
            center={DEFAULT}
            zoom={14}
            whenCreated={map => (mapRef.current = map)}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* User */}
            <Marker position={[user.lat, user.lon]} />

            {/* Destination */}
            {destination && (
                <Marker position={[destination.lat, destination.lon]} />
            )}

            {/* Routes */}
            {routes.map((r, i) => (
                <Polyline
                    key={i}
                    positions={r.geometry.coordinates.map(c => [c[1], c[0]])}
                    color="blue"
                    weight={4}
                />
            ))}

            {/* Heatmap (SAFE) */}
            {heatmap.map((p, i) => (
                <Circle
                    key={i}
                    center={[p.lat, p.lon]}
                    radius={150}
                    pathOptions={{
                        color:
                            p.intensity > 0.7
                                ? "red"
                                : p.intensity > 0.4
                                    ? "orange"
                                    : "yellow",
                        fillOpacity: 0.4
                    }}
                />
            ))}
        </MapContainer>
    );
}
