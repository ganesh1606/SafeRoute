import { useState } from "react";
import { searchPlaces } from "../services/search";
import RouteCard from "./RouteCard";

export default function LeftDashboard({ onSearch, routes, selected, onSelect }) {
    const [srcQ, setSrcQ] = useState("");
    const [dstQ, setDstQ] = useState("");
    const [src, setSrc] = useState(null);
    const [dst, setDst] = useState(null);
    const [mode, setMode] = useState("car");
    const [srcRes, setSrcRes] = useState([]);
    const [dstRes, setDstRes] = useState([]);

    async function handleSearch(q, setter) {
        if (q.length < 3) return setter([]);
        setter(await searchPlaces(q));
    }

    return (
        <div className="panel">
            <h1>SafeRoute</h1>
            <p className="subtitle">Choose the safest way home</p>

            <input
                placeholder="Choose starting point"
                value={srcQ}
                onChange={e => {
                    setSrcQ(e.target.value);
                    handleSearch(e.target.value, setSrcRes);
                }}
            />
            {srcRes.map(p => (
                <div key={p.label} className="suggestion" onClick={() => {
                    setSrc(p); setSrcQ(p.label); setSrcRes([]);
                }}>{p.label}</div>
            ))}

            <input
                placeholder="Where are you going?"
                value={dstQ}
                onChange={e => {
                    setDstQ(e.target.value);
                    handleSearch(e.target.value, setDstRes);
                }}
            />
            {dstRes.map(p => (
                <div key={p.label} className="suggestion" onClick={() => {
                    setDst(p); setDstQ(p.label); setDstRes([]);
                }}>{p.label}</div>
            ))}

            <div className="modes">
                {["walk", "cycle", "car"].map(m => (
                    <button key={m} className={mode === m ? "active" : ""} onClick={() => setMode(m)}>
                        {m === "walk" ? "🚶" : m === "cycle" ? "🚲" : "🚗"}
                    </button>
                ))}
            </div>

            <button className="route-btn" disabled={!src || !dst} onClick={() => onSearch(src, dst, mode)}>
                FIND ROUTES
            </button>

            <div className="routes">
                {routes.map((r, i) => (
                    <RouteCard key={i} route={r} active={i === selected} onClick={() => onSelect(i)} />
                ))}
            </div>
        </div>
    );
}
