import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import LeftDashboard from "./components/LeftDashboard";
import SOSButton from "./components/SOSButton";
import { fetchRoutes, checkDanger } from "./services/api";
import { startGPS } from "./services/gps";
import { speak } from "./services/voice";

export default function App() {
    const [routes, setRoutes] = useState([]);
    const [selected, setSelected] = useState(0);
    const [currentPos, setCurrentPos] = useState(null);
    const [destination, setDestination] = useState(null);
    const [mode, setMode] = useState("car");

    useEffect(() => {
        startGPS(async pos => {
            setCurrentPos(pos);

            const alert = await checkDanger(pos.lat, pos.lon);
            if (alert.alert) speak(alert.message);
        });
    }, []);

    async function handleSearch(source, dest, m) {
        setDestination(dest);
        setMode(m);
        const res = await fetchRoutes(source, dest, m);
        setRoutes(res.routes);
        setSelected(0);
    }

    return (
        <div className="layout">
            <LeftDashboard
                onSearch={handleSearch}
                routes={routes}
                selected={selected}
                onSelect={setSelected}
            />

            <MapView
                routes={routes}
                selected={selected}
                currentPos={currentPos}
                destination={destination}
            />

            <SOSButton position={currentPos} />
        </div>
    );
}
