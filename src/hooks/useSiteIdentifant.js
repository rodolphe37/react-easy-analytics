import { useCallback, useEffect, useState } from "react";

const useSiteIdentifiant = ({ siteName }) => {
  const siteIdUtil = siteName;
  const [newSiteId, setCreateSiteId] = useState(undefined);
  const idAlreadyExist = localStorage.getItem("siteIdAnalytics");
  const [sitesList, setSitesList] = useState([]);

  const siteIdControler = useCallback(() => {
    function ifUserExist() {
      if (newSiteId === undefined && siteIdUtil && idAlreadyExist === null) {
        setCreateSiteId(siteIdUtil);
        localStorage.setItem("siteIdAnalytics", siteIdUtil);
      } else if (newSiteId === undefined && idAlreadyExist !== null) {
        setCreateSiteId(idAlreadyExist);
      }
    }
    ifUserExist();
    if (newSiteId !== undefined && sitesList?.length === 0) {
      setSitesList([newSiteId]);
    } else if (newSiteId !== undefined && sitesList?.length >= 1) {
      setSitesList([...sitesList, newSiteId]);
    }
    if (siteIdUtil === undefined && idAlreadyExist !== null) {
      localStorage.removeItem("siteIdAnalytics");
    }
    if (siteIdUtil !== idAlreadyExist) {
      localStorage.setItem("siteIdAnalytics", siteIdUtil);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAlreadyExist, siteIdUtil, newSiteId]);

  useEffect(() => {
    siteIdControler();
  }, [siteIdControler]);
  return { newSiteId, idAlreadyExist, sitesList };
};

export default useSiteIdentifiant;
