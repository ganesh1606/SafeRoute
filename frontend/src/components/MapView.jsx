import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import L from "leaflet";

const arrow = angle => new L.DivIcon({
    html: `<div style="width:32px;height:32px;border-left:6px solid #2563eb;border-bottom:6px solid #2563eb;transform:rotate(${135 + angle}deg)"></div>`,
    iconSize: [36, 36], iconAnchor: [18, 18]
});

export default function MapView({ routes, selected, currentPos, destination }) {
    return (
        <MapContainer center={[16.545, 81.52]} zoom={14} style={{ height: "100vh" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {currentPos && <Marker position={[currentPos.lat, currentPos.lon]} icon={arrow(currentPos.heading)} />}
            {destination && <Marker position={[destination.lat, destination.lon]} />}

            {routes.map((r, i) => (
                <Polyline key={i} positions={r.points.map(p => [p.lat, p.lon])}
                    color={r.color} weight={i === selected ? 7 : 5} />
            ))}
        </MapContainer>
    );
}
