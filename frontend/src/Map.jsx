import { MapContainer, TileLayer, Marker, Polyline, Circle } from "react-leaflet";

export default function Map({ user, dest, route, heatmap, setDest }) {
    return (
        <MapContainer center={[user.lat, user.lon]} zoom={14} style={{ height: "80vh" }}
            onClick={e => setDest({ lat: e.latlng.lat, lon: e.latlng.lng })}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[user.lat, user.lon]} />
            {dest && <Marker position={[dest.lat, dest.lon]} />}
            {route && <Polyline positions={route.route} />}
            {heatmap.map((p, i) => (
                <Circle key={i} center={[p.lat, p.lon]} radius={150}
                    pathOptions={{ color: "red", fillOpacity: 0.4 }} />
            ))}
        </MapContainer>
    );
}
