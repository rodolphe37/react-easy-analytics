import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import useGetData from "../../hooks/useGetDatas";
import useSiteIdentifiant from "../../hooks/useSiteIdentifant";
import { siteNameAtom } from "../../statesManager/datasAtom";
import useDebugMode from "../../utils/useDebugMode";

const DashboardProvider = ({ children, siteName, DEBUG_MODE, BASE_URL }) => {
  let IsMounted = useRef(false);
  const [siteIdentifant, setSiteIdentifiant] = useRecoilState(siteNameAtom);
  const { datas } = useGetData({ BASE_URL });
  // const userIdFromServer = datas.map((r) => r.usersId);
  const [usersIdList, setUsersIdList] = useState([]);
  const { sitesList } = useSiteIdentifiant({ siteName });
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
      usersIdList.length > 0 &&
      datas.length > 0
    ) {
      providerDebugConsoles();
      IsMounted.current = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DEBUG_MODE, siteIdentifant, sitesList, datas]);

  const usersIdFiltered = useCallback(() => {
    let combinedArray = [];
    let uniq = {};
    combinedArray.push(...datas.map((r, id) => r.usersId));
    const merged = [].concat.apply([], combinedArray);
    const arrFiltered = merged.filter(
      (obj) => !uniq[obj.userId] && (uniq[obj.userId] = true)
    );

    setUsersIdList(arrFiltered);
  }, [datas]);

  useEffect(() => {
    if (IsMounted.current) {
      usersIdFiltered();
    }
  }, [datas, usersIdFiltered]);

  return (
    <div className="dashboard__consumer-container">
      {DEBUG_MODE ? (
        <div className="providerConsole">
          <div className="header-debugger">
            <span style={{ color: "red", fontSize: 30, marginBottom: "2rem" }}>
              DEBUG_MODE ACTIF
            </span>
            <header
              className="Dashboard-header"
              style={{
                color: "white",
                fontSize: 28,
                // position: "absolute",
                // left: 25,
                // top: 25,
                marginBottom: "2rem",
              }}
            >
              Dashboard
            </header>
            <q
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: 14,
                // position: "absolute",
                // right: 80,
                // top: 50,
                maxWidth: 150,
                marginBottom: "2rem",
              }}
            >
              Open devtool to see the console.
            </q>
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
            <div
              style={{ border: "1px solid white", padding: 7, margin: "1rem" }}
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
                Users number:
                <span
                  className="App-link"
                  style={{ fontSize: 22, fontWeight: "bold" }}
                >
                  {usersIdList.length}
                </span>
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
                      border: "1px dotted red",
                      padding: "1rem",
                    }}
                  >
                    {" "}
                    <span style={{ color: "red" }}>{id + 1}</span>
                    &ensp; User Id from server :
                    <span className="App-link">{res.userId}</span>
                  </span>
                ))}
            </div>
            <div
              style={{
                color: "white",
                display: "grid",
                gridTemplateColumns: "repeat(5,1fr)",
                border: "1px solid white",
                padding: 7,
                margin: "1rem",
              }}
            >
              {usersIdList && (
                <>
                  <span
                    style={{
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                      border: "1px dotted red",
                      padding: "1rem",
                    }}
                  >
                    City :
                    {usersIdList.map((res, index) => (
                      <Fragment key={index}>
                        <span style={{ color: "red" }}>{index + 1}</span>

                        <span className="App-link">{res.city}</span>
                      </Fragment>
                    ))}
                  </span>
                  <span
                    style={{
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                      border: "1px dotted red",
                      padding: "1rem",
                    }}
                  >
                    Country :
                    {usersIdList.map((res, index) => (
                      <Fragment key={index}>
                        <span style={{ color: "red" }}>{index + 1}</span>

                        <span className="App-link">{res.country}</span>
                      </Fragment>
                    ))}
                  </span>
                  <span
                    style={{
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                      border: "1px dotted red",
                      padding: "1rem",
                    }}
                  >
                    isp :
                    {usersIdList.map((res, index) => (
                      <Fragment key={index}>
                        <span style={{ color: "red" }}>{index + 1}</span>

                        <span className="App-link">{res.isp}</span>
                      </Fragment>
                    ))}
                  </span>
                  <span
                    style={{
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                      border: "1px dotted red",
                      padding: "1rem",
                    }}
                  >
                    Country Code:
                    {usersIdList.map((res, index) => (
                      <Fragment key={index}>
                        <span style={{ color: "red" }}>{index + 1}</span>

                        <span className="App-link"> {res.country_code}</span>
                      </Fragment>
                    ))}
                  </span>

                  <span
                    style={{
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                      border: "1px dotted red",
                      padding: "1rem",
                    }}
                  >
                    IP :
                    {usersIdList.map((res, index) => (
                      <Fragment key={index}>
                        <span style={{ color: "red" }}>{index + 1}</span>

                        <span className="App-link"> {res.ip}</span>
                      </Fragment>
                    ))}
                  </span>
                </>
              )}
            </div>
            {usersIdList && (
              <div
                style={{
                  border: "1px solid white",
                  padding: 7,
                  margin: "1rem",
                }}
              >
                {usersIdList.map((res, index) => (
                  <span
                    key={index}
                    style={{
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                      border: "1px dotted red",
                    }}
                  >
                    <span style={{ color: "red" }}>{index + 1}</span>
                    &ensp; latitude:
                    <span className="App-link">{res.latitude}</span>
                    longitude:
                    <span className="App-link">{res.longitude}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default DashboardProvider;
