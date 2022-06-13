import axios from "axios";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { geolocationArrayAtom } from "../statesManager/datasAtom";

const useGeolocation = () => {
  const [geoData, setGeoData] = useRecoilState(geolocationArrayAtom);

  const GetGeoData = useCallback(async () => {
    await axios.get("https://ip.nf/me.json").then((response) => {
      setGeoData(response.data);
    });
  }, [setGeoData]);

  return {
    geoData,
    GetGeoData,
  };
};

export default useGeolocation;
