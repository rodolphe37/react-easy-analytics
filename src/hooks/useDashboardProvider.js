import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  siteNameAtom,
  usersIdListFilteredAtom,
  usersListFilteredBySessionsAtom,
} from "../statesManager/datasAtom";
import useDebugMode from "../utils/useDebugMode";
import useFilteredByUsersList from "../utils/useFilteredByUsersList";
import useGetData from "./useGetDatas";
import useSiteIdentifiant from "./useSiteIdentifant";

const useDashboardProvider = ({ BASE_URL, siteName, DEBUG_MODE }) => {
  let IsMounted = useRef(false);
  const [siteIdentifant, setSiteIdentifiant] = useRecoilState(siteNameAtom);
  const { datas } = useGetData({ BASE_URL });
  // const userIdFromServer = datas.map((r) => r.usersId);
  const [usersIdList, setUsersIdList] = useRecoilState(usersIdListFilteredAtom);
  const [FilteredusersBySessions, setFilteredUsersBySessions] = useRecoilState(
    usersListFilteredBySessionsAtom
  );
  const [sessionsUsersIdForCout, setUSersIdForCount] = useState([]);
  const { sitesList } = useSiteIdentifiant({ siteName });
  const { providerDebugConsoles } = useDebugMode({ BASE_URL, siteName });
  const { usersIdFiltered } = useFilteredByUsersList();

  useEffect(() => {
    if (siteName && siteIdentifant === "") {
      setSiteIdentifiant(siteName);
    }
  }, [siteName, siteIdentifant, setSiteIdentifiant]);

  useEffect(() => {
    IsMounted.current = true;
    if (
      DEBUG_MODE &&
      IsMounted.current &&
      sitesList.length > 0 &&
      usersIdList.length > 0 &&
      datas.length > 0
    ) {
      providerDebugConsoles();
      IsMounted.current = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DEBUG_MODE, siteIdentifant, sitesList, datas]);

  useEffect(() => {
    if (IsMounted.current) {
      usersIdFiltered(datas, setUsersIdList);

      if (FilteredusersBySessions.length === 0) {
        let combinedArray = [];
        combinedArray.push(...datas.map((r, id) => r.session));
        const merged = [].concat.apply([], combinedArray);
        setFilteredUsersBySessions(merged);
      }

      const count = FilteredusersBySessions.map((res) => res.userId).reduce(
        (accumulator, value) => {
          return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
        },
        {}
      );
      const result = [];

      for (let i in count) result.push([i, count[i]]);
      const merged = [].concat.apply([], result);

      setUSersIdForCount(merged);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    datas,
    sessionsUsersIdForCout,
    setUsersIdList,
    usersIdFiltered,
    setFilteredUsersBySessions,
  ]);
  return {
    sitesList,
    usersIdList,
    sessionsUsersIdForCout,
  };
};

export default useDashboardProvider;
