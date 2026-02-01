import { useEffect, useState } from "react";
import { getHeatmap } from "../api";

export default function useHeatmap() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    getHeatmap().then(setPoints);
  }, []);

  return points;
}
