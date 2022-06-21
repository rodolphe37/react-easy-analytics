import axios from "axios";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { geolocationArrayAtom } from "../statesManager/datasAtom";

const useGeolocation = () => {
  const [geoData, setGeoData] = useRecoilState(geolocationArrayAtom);

  const GetGeoData = useCallback(async () => {
    await axios.get("https://ip.nf/me.json").then((response) => {
      setGeoData(response.data);
      console.log("resp geo: ", response.data);
    });
  }, [setGeoData]);

  useEffect(() => {
    const getGeo = async () => {
      try {
        await GetGeoData();
      } catch (error) {
        console.error("Request failed:", error);
      }
    };
    if (!geoData) {
      getGeo();
    }
  }, [setGeoData, GetGeoData, geoData]);
  return {
    geoData,
    GetGeoData,
  };
};

export default useGeolocation;
