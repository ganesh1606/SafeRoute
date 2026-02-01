import { speak } from "../services/voice";

export default function SOSButton({ position }) {
    async function trigger() {
        if (!position) return;
        await fetch("http://localhost:8000/sos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(position) });
        speak("Emergency alert sent. Stay safe.");
        alert("SOS sent!");
    }

    return (
        <button className="sos" onClick={trigger}>SOS</button>
    );
}
