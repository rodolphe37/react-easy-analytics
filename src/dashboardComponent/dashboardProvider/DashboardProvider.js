import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import useControlUserId from "../../hooks/useControlUserId";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import useGeolocation from "../../hooks/useGeolocation";
import useGetData from "../../hooks/useGetDatas";
import useSiteIdentifiant from "../../hooks/useSiteIdentifant";
import {
  geolocationArrayAtom,
  siteNameAtom,
} from "../../statesManager/datasAtom";
import useDebugMode from "../../utils/useDebugMode";

const DashboardProvider = ({ children, siteName, DEBUG_MODE, BASE_URL }) => {
  let IsMounted = useRef(false);
  const [siteIdentifant, setSiteIdentifiant] = useRecoilState(siteNameAtom);
  const { datas } = useGetData({ BASE_URL });
  const userIdFromServer = datas.map((r) => r.usersId);
  const { usersIdList } = useControlUserId();
  const { sitesList } = useSiteIdentifiant({ siteName });
  const [geoData] = useRecoilState(geolocationArrayAtom);
  const { providerDebugConsoles } = useDebugMode({ BASE_URL, siteName });
  const resetAll = () => {
    localStorage.clear();
    window.location.reload();
  };

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
      usersIdList.length > 0
    ) {
      providerDebugConsoles();
      IsMounted.current = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DEBUG_MODE, siteIdentifant, sitesList, datas]);
  return (
    <div
      className="dashboard__consumer-container"
      style={{
        textAlign: "center",
        backgroundColor: "#282c34",
        width: "100%",
        height: "100vh",
      }}
    >
      {DEBUG_MODE ? (
        <div
          style={{
            position: "absolute",
            zIndex: 8,
            top: "10px",
            width: "90%",
            left: "1.7rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            border: "6px solid rgba(255,255,255,0.98)",
            background: "#000",
            paddingBottom: 10,
          }}
        >
          <br />
          <button onClick={resetAll}>Reset all</button>
          <br />
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div style={{ border: "1px solid white", padding: 7 }}>
              <span
                style={{
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                Users number:
                <span className="App-link">{usersIdList?.length}</span>
              </span>

              {usersIdList &&
                usersIdList.map((res, id) => (
                  <span
                    key={id}
                    style={{
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    User Id from server :<span className="App-link">{res}</span>
                  </span>
                ))}
              {usersIdList?.map((resUser, id) => (
                <span
                  key={id}
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  User Id from localStorage:
                  <span className="App-link">{resUser}</span>
                </span>
              ))}
            </div>
            <div style={{ border: "1px solid white", padding: 7 }}>
              {sitesList?.map((res, id) => (
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                  key={id}
                >
                  Site Id :<span className="App-link">{res}</span>
                </span>
              ))}
            </div>
            {geoData && (
              <div style={{ border: "1px solid white", padding: 7 }}>
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  latitude:
                  <span className="App-link">{geoData.ip?.latitude}</span>
                  longitude:
                  <span className="App-link">{geoData.ip?.longitude}</span>
                </span>
              </div>
            )}
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "90%",
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
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default DashboardProvider;
