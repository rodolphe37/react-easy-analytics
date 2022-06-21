import { useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import useControlUserId from "../hooks/useControlUserId";
import useGeolocation from "../hooks/useGeolocation";
import useGetData from "../hooks/useGetDatas";
import useSessionNumbers from "../hooks/useSessionNumbers";
import { usersIdListFilteredAtom } from "../statesManager/datasAtom";

const useDebugMode = ({ BASE_URL, siteName }) => {
  const { sessionNumbers, userSessionObject } = useSessionNumbers();
  const { geoData } = useGeolocation();
  const { datas } = useGetData({ BASE_URL });
  const { UserWithId } = useControlUserId();
  const isLoaded = useRef(false);
  const [usersIdList] = useRecoilState(usersIdListFilteredAtom);

  const providerDebugConsoles = useCallback(() => {
    if (!isLoaded.current) {
      console.group("PROVIDER = DEBUG_MODE ACTIF");
      console.group(
        "PROVIDER = %cusers geolocation",
        "color: white;  font-weight:bold; background-color: blue;padding: 2px"
      );
      console.table([usersIdList]);
      console.groupEnd();
      console.group(
        "PROVIDER = %cAll data from server",
        "color: white;  font-weight:bold; background-color:blue;padding: 2px"
      );
      console.log(datas.filter((r) => r.siteName === siteName));
      console.groupEnd();

      console.group(
        "PROVIDER = %cUsersWithId",
        "color: white;  font-weight:bold; background-color:blue;padding: 2px"
      );
      console.table([usersIdList.map((res) => res.userId)]);
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
        "PROVIDER = %cuserSessionObject from localStorage client",
        "color: white;  font-weight:bold; background-color:blue;padding: 2px"
      );
      console.log(userSessionObject);
      console.groupEnd();
      console.groupEnd();
      isLoaded.current = true;
    }
  }, [datas, usersIdList, siteName, userSessionObject]);
  return {
    providerDebugConsoles,
    geoData,
    datas,
    UserWithId,
    siteName,
    sessionNumbers,
    userSessionObject,
  };
};

export default useDebugMode;
