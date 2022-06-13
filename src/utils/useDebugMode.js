import { useCallback } from "react";
import useControlUserId from "../hooks/useControlUserId";
import useGeolocation from "../hooks/useGeolocation";
import useGetData from "../hooks/useGetDatas";
import useSessionNumbers from "../hooks/useSessionNumbers";

const useDebugMode = ({ BASE_URL, siteName }) => {
  const { sessionNumbers, userSessionObject } = useSessionNumbers();
  const { geoData } = useGeolocation();
  const { datas } = useGetData({ BASE_URL });
  const { UserWithId } = useControlUserId();

  const debugConsoles = useCallback(() => {
    if (geoData !== null && datas.length > 0 && UserWithId !== "") {
      console.group("PROVIDER = DEBUG_MODE ACTIF");
      console.group(
        "PROVIDER = %cuser geolocation",
        "color: white;  font-weight:bold; background-color: blue;padding: 2px"
      );
      console.table([geoData?.ip]);
      console.groupEnd();
      console.group(
        "PROVIDER = %cdata from server",
        "color: white;  font-weight:bold; background-color:blue;padding: 2px"
      );
      console.log(datas);
      console.groupEnd();
      console.group(
        "PROVIDER = %cUserWithId",
        "color: white;  font-weight:bold; background-color:blue;padding: 2px"
      );
      console.log(
        `%c${UserWithId}`,
        "font-weight: bold; color:#871F78; padding: 2px"
      );
      console.groupEnd();
      console.group(
        "PROVIDER = %csite name",
        "color: white;  font-weight:bold; background-color:blue;padding: 2px"
      );
      console.log(
        `%c${siteName}`,
        "font-weight: bold;color:#871F78;  padding: 2px"
      );
      console.groupEnd();
      console.group(
        "PROVIDER = %csessionNumbers",
        "color: white;  font-weight:bold; background-color:blue;padding: 2px"
      );
      console.log(
        `%c${userSessionObject?.length}`,
        "font-weight: bold;color:#871F78;  padding: 2px"
      );
      console.groupEnd();
      console.group(
        "PROVIDER = %cuserSessionObject",
        "color: white;  font-weight:bold; background-color:blue;padding: 2px"
      );
      console.log(userSessionObject);
      console.groupEnd();
      console.groupEnd();
    }
  }, [geoData, datas, UserWithId, siteName, userSessionObject]);
  return {
    debugConsoles,
    geoData,
    datas,
    UserWithId,
    siteName,
    sessionNumbers,
    userSessionObject,
  };
};

export default useDebugMode;
