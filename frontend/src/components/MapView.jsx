import { useEffect, useRef } from "react";
import L from "leaflet";

export default function MapView({ routes, selected, destination }) {
    const ref = useRef(null);
    const map = useRef(null);
    const layers = useRef([]);

    useEffect(() => {
        if (map.current) return;

        map.current = L.map(ref.current).setView(
            [16.5449, 81.5212],
            14
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap"
        }).addTo(map.current);
    }, []);

    useEffect(() => {
        if (!map.current) return;

        layers.current.forEach(l => map.current.removeLayer(l));
        layers.current = [];

        routes.forEach((r, i) => {
            const line = L.polyline(
                r.points.map(p => [p.lat, p.lon]),
                {
                    color: r.color,
                    weight: i === selected ? 7 : 4
                }
            ).addTo(map.current);

            layers.current.push(line);

            if (i === selected) {
                map.current.fitBounds(line.getBounds(), { padding: [40, 40] });
            }
        });

        if (destination) {
            layers.current.push(
                L.marker([destination.lat, destination.lon]).addTo(map.current)
            );
        }
    }, [routes, selected, destination]);

    return <div ref={ref} style={{ flex: 1, height: "100vh" }} />;
}
