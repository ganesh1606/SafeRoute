import { useEffect, useState } from "react";

export default function Dashboard() {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/heatmap")
            .then(res => res.json())
            .then(setPoints);
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Danger Heatmap</h2>
            {points.map((p, i) => (
                <div key={i}>
                    {p.lat}, {p.lon} → {p.intensity}
                </div>
            ))}
        </div>
    );
}
