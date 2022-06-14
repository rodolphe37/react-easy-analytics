import axios from "axios";
import { useEffect, useState } from "react";
import useGeolocation from "./useGeolocation";
import useGetData from "./useGetDatas";
import useTodayDate from "./useTodayDate";

const usePostDatas = ({ BASE_URL, DEBUG_MODE, siteName }) => {
  const userAlreadyExist = localStorage.getItem("userIdAnalytics");
  const { todayMls } = useTodayDate();
  const { geoData, GetGeoData } = useGeolocation();
  const { getData } = useGetData({ BASE_URL });

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
        console.log(
          "%cSending to server - In progress",
          "color: orange;  font-weight:bold; padding: 2px"
        );
        await axios
          .post(`${BASE_URL}/siteAnalytics`, obj)
          .then((res) => {
            if (res) {
              console.log(
                "%cSent to server - OK",
                "color: green;  font-weight:bold; padding: 2px"
              );
            }
          })
          .then(() => {
            console.log(
              "%cupdating data - In progress",
              "color: orange;  font-weight:bold; padding: 2px"
            );
            getData();
          })
          .then(() => {
            console.log(
              "%cdata updated - OK",
              "color: green;  font-weight:bold; padding: 2px"
            );
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
