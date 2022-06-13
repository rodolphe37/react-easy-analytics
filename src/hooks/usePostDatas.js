import axios from "axios";
import { useEffect, useState } from "react";
import useGeolocation from "./useGeolocation";
import useTodayDate from "./useTodayDate";

const usePostDatas = ({ BASE_URL, DEBUG_MODE, siteName }) => {
  const userAlreadyExist = localStorage.getItem("userIdAnalytics");
  const { todayMls } = useTodayDate();
  const { geoData, GetGeoData } = useGeolocation();

  const [sessionNumbers] = useState(
    Number(localStorage.getItem("sessionNumber") || 0)
  );

  const postData = async () => {
    const obj = {
      status: "published",
      siteName: siteName,
      usersId: [
        {
          userId: userAlreadyExist,
          country: geoData?.ip.country,
          isp: geoData?.ip.asn,
          ip: geoData?.ip.ip,
          country_code: geoData?.ip.country_code,
          latitude: geoData?.ip.latitude,
          longitude: geoData?.ip.longitude,
        },
      ],
      session: [
        {
          date: todayMls,
          sessionNumber: sessionNumbers,
        },
      ],
    };

    if (geoData !== []) {
      try {
        await axios.post(`${BASE_URL}/siteAnalytics`, obj).then((res) => {
          if (res) {
            console.log(
              "%cSend to server - OK",
              "color: green;  font-weight:bold; padding: 2px"
            );
          }
        });
      } catch (error) {
        console.error(
          "%cSend to server - ERROR",
          "color: red;  font-weight:bold; padding: 2px",
          error
        );
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
  }, [geoData, GetGeoData]);

  return {
    SendToServer,
  };
};

export default usePostDatas;
