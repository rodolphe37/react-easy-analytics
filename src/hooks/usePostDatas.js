import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import useGeolocation from "./useGeolocation";
import useGetData from "./useGetDatas";
import useTodayDate from "./useTodayDate";

const usePostDatas = ({ BASE_URL, siteName, ifSiteNameExist }) => {
  const userAlreadyExist = localStorage.getItem("userIdAnalytics");
  const { todayMls } = useTodayDate();
  const { geoData, GetGeoData } = useGeolocation();
  const { datas } = useGetData({ BASE_URL });
  const [datasTransition, setDatasTransition] = useState(undefined);

  const [sessionNumbers] = useState(
    Number(localStorage.getItem("sessionNumber") || 0)
  );

  useEffect(() => {
    if (datas.length > 0 && datasTransition === undefined) {
      setDatasTransition(datas.map((r) => r.id));
    }
    // console.log(
    //   "id for this site name",
    //   ifSiteNameExist ? datasTransition : "nothing"
    // );
    // console.log("site name is present", ifSiteNameExist);
  }, [ifSiteNameExist, datas, siteName, datasTransition]);

  // const updateData = useCallback(async () => {
  //   const objUpdate = {
  //     usersId: [
  //       {
  //         userId: userAlreadyExist,
  //         country: geoData?.ip.country,
  //         isp: geoData?.ip.asn,
  //         ip: geoData?.ip.ip,
  //         country_code: geoData?.ip.country_code,
  //         latitude: geoData?.ip.latitude,
  //         longitude: geoData?.ip.longitude,
  //         sessionNumbers: sessionNumbers,
  //       },
  //     ],
  //     session: [
  //       {
  //         date: todayMls,
  //         sessionNumber: sessionNumbers,
  //         userId: userAlreadyExist,
  //       },
  //     ],
  //   };
  //   if (geoData !== []) {
  //     try {
  //       console.log(
  //         "%cPatch data to server - In progress",
  //         "color: orange;  font-weight:bold; padding: 2px"
  //       );

  //       await axios
  //         .patch(
  //           `${BASE_URL}/siteAnalytics/${Number(datasTransition)}`,
  //           objUpdate
  //         )
  //         .then((res) => {
  //           if (res) {
  //             console.log(
  //               "%Patch to server - OK",
  //               "color: green;  font-weight:bold; padding: 2px"
  //             );
  //           }
  //         })
  //         .then(() => {
  //           console.log(
  //             "%cUpdating data - In progress",
  //             "color: orange;  font-weight:bold; padding: 2px"
  //           );
  //         })
  //         .then(() => {
  //           console.log(
  //             "%cData updated - OK",
  //             "color: green;  font-weight:bold; padding: 2px"
  //           );
  //         });
  //     } catch (error) {
  //       console.error(
  //         "%cSend to server - ERROR",
  //         "color: red;  font-weight:bold; padding: 2px",
  //         error
  //       );
  //     }
  //   }
  // }, [
  //   BASE_URL,
  //   datasTransition,
  //   geoData,

  //   sessionNumbers,
  //   todayMls,
  //   userAlreadyExist,
  // ]);

  const postData = useCallback(async () => {
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
          sessionNumbers: sessionNumbers,
        },
      ],
      session: [
        {
          date: todayMls,
          sessionNumber: sessionNumbers,
          userId: userAlreadyExist,
        },
      ],
    };

    if (geoData !== []) {
      try {
        console.log(
          "%cPost data to server - In progress",
          "color: orange;  font-weight:bold; padding: 2px"
        );

        await axios
          .post(`${BASE_URL}/siteAnalytics`, obj)
          .then((res) => {
            if (res) {
              console.log(
                "%cPost to server - OK",
                "color: green;  font-weight:bold; padding: 2px"
              );
            }
          })
          .then(() => {
            console.log(
              "%cUpdating data - In progress",
              "color: orange;  font-weight:bold; padding: 2px"
            );
          })
          .then(() => {
            console.log(
              "%cData updated - OK",
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
  }, [BASE_URL, geoData, sessionNumbers, siteName, todayMls, userAlreadyExist]);

  useEffect(() => {
    if (geoData === {}) {
      GetGeoData();
    }
  }, [geoData, GetGeoData]);

  return {
    postData,
    // updateData,
    userAlreadyExist,
  };
};

export default usePostDatas;
