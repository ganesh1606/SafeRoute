import { sendSOS } from "../api";

export default function useSOS(user) {
  return () => {
    if (!user) return;
    sendSOS(user.lat, user.lon);
    alert("🚨 SOS SENT");
  };
}
