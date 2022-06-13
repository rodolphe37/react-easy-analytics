import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { siteNameAtom } from "../statesManager/datasAtom";
import useGeolocation from "./useGeolocation";
import useTodayDate from "./useTodayDate";

const usePostDatas = ({ BASE_URL, DEBUG_MODE }) => {
  const userAlreadyExist = localStorage.getItem("userIdAnalytics");
  const [siteIdentifant] = useRecoilState(siteNameAtom);
  const { todayMls } = useTodayDate();
  const { geoData, GetGeoData } = useGeolocation();

  const [sessionNumbers] = useState(
    Number(localStorage.getItem("sessionNumber") || 0)
  );

  const postData = async () => {
    const { country, asn, ip, country_code, latitude, longitude } = geoData?.ip;
    const obj = {
      status: "published",
      siteName: siteIdentifant,
      usersId: [
        {
          userId: userAlreadyExist,
        },
      ],
      session: [
        {
          date: todayMls,
          sessionNumber: sessionNumbers,
        },
      ],
      country: country,
      isp: asn,
      ip: ip,
      country_code: country_code,
      latitude: latitude,
      longitude: longitude,
    };

    if (geoData !== []) {
      try {
        await axios.post(`${BASE_URL}/siteAnalytics`, obj).then((res) => {
          if (res) {
            console.log("res.data.data", res.data.data);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  async function SendToServer() {
    await postData();
  }
  useEffect(() => {
    if (geoData === {}) {
      GetGeoData();
    }
    console.log("geoData", geoData);
  }, [geoData, GetGeoData]);

  return {
    SendToServer,
  };
};

export default usePostDatas;
