import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import useControlUserId from "../../hooks/useControlUserId";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import useGeolocation from "../../hooks/useGeolocation";
import useGetData from "../../hooks/useGetDatas";
import usePostDatas from "../../hooks/usePostDatas";
import useSessionNumbers from "../../hooks/useSessionNumbers";
import { siteNameAtom } from "../../statesManager/datasAtom";

const AnalyticsProvider = ({ children, BASE_URL, DEBUG_MODE, siteName }) => {
  const { datas, getData } = useGetData({ BASE_URL });
  const ifSiteNameExist = datas && datas.some((re) => re.siteName === siteName);
  const [datasTransition, setDatasTransition] = useState(undefined);
  const userAlreadyExist = localStorage.getItem("userIdAnalytics");
  const [siteIdentifant, setSiteIdentifiant] = useRecoilState(siteNameAtom);

  const { postData, updateData } = usePostDatas({
    BASE_URL,
    DEBUG_MODE,
    siteName,
    ifSiteNameExist,
    datasTransition,
    setDatasTransition,
  });
  const { sessionNumbers, incrementCount, userSessionObject } =
    useSessionNumbers();
  const { geoData, GetGeoData } = useGeolocation();

  const { UserWithId } = useControlUserId();

  let IsMounted = useRef(false);
  const isSended = useRef(false);

  useEffect(() => {
    IsMounted.current = true;
    incrementCount();

    return () => {
      IsMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectOnce(() => {
    if (geoData === null) {
      try {
        GetGeoData();
        getData();
        setSiteIdentifiant(datas.siteName);
      } catch (error) {
        console.error("Request failed:", error);
      }
    }
    if (siteIdentifant === null) {
      siteIdentifant(datas.siteName);
    }
  }, [GetGeoData, getData, geoData]);

  useEffect(() => {
    async function SendToServer() {
      if (!ifSiteNameExist) {
        await postData();
      }
      if (ifSiteNameExist) {
        await updateData();
      }
    }
    if (!IsMounted.current) {
      return;
    }
    IsMounted.current = true;

    if (IsMounted.current && DEBUG_MODE) {
      if (!isSended.current && geoData !== null) {
        console.log("resp geo: ", geoData.ip);
        SendToServer();
        isSended.current = true;
      }
    }
  }, [
    geoData,
    datas,
    UserWithId,
    siteName,
    sessionNumbers,
    userSessionObject,
    DEBUG_MODE,
    ifSiteNameExist,
    postData,
    updateData,
  ]);

  const handleResetAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div
      className="analytics__provider-container"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      {DEBUG_MODE ? (
        <div
          style={{
            position: "absolute",
            zIndex: 8,
            fontSize: 14,
            top: "10px",
            width: "90%",
            left: "1.7rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",

            paddingBottom: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                color: "white",
                border: "1px solid white",
                padding: 7,
                width: "100%",
                textAlign: "center",
              }}
            >
              Site name:&nbsp;
              <span className="App-link">{siteName}</span>
            </span>
            <div
              style={{ border: "1px solid white", padding: 7, width: "100%" }}
            >
              <span
                style={{
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                User Id from localStorage:
                <span className="App-link">{userAlreadyExist}</span>
              </span>
            </div>
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-around",
              marginTop: 15,
              border: "1px solid white",
              padding: 7,
            }}
          >
            {geoData && (
              <>
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  City :<span className="App-link">{geoData.ip?.city}</span>
                </span>
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  Country :
                  <span className="App-link">{geoData.ip?.country}</span>
                </span>
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  isp :<span className="App-link">{geoData.ip?.asn}</span>
                </span>
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  Country Code:
                  <span className="App-link">{geoData.ip?.country_code}</span>
                </span>

                <span
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  IP :<span className="App-link">{geoData.ip?.ip}</span>
                </span>
              </>
            )}
          </div>
          <span style={{ color: "red", fontSize: 30, marginBottom: "2rem" }}>
            DEBUG_MODE ACTIF
          </span>
        </div>
      ) : null}
      {children}

      {DEBUG_MODE ? (
        <>
          <br />
          <button onClick={handleResetAll}>Reset all & reload</button>
          <br />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default AnalyticsProvider;
