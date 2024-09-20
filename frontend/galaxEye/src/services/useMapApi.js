import axios from "axios";
import { useEffect, useState } from "react";

export function useMapApi() {
  const [tilesLoaded, setTilesLoaded] = useState(false);

  useEffect(() => {
    async function checkKarnatakaTiles() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/check-tiles"
        );

        if (response.data.success) {
          setTilesLoaded(true);
        } else {
          setTilesLoaded(false);
          console.warn(response.data.message);
        }
      } catch (error) {
        console.error("Error checking Karnataka tiles:", error);
        setTilesLoaded(false);
      }
    }
    checkKarnatakaTiles();
  }, []);

  return { tilesLoaded };
}
