import { Fragment, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import useGetData from "../../hooks/useGetDatas";
import useSiteIdentifiant from "../../hooks/useSiteIdentifant";
import {
  siteNameAtom,
  usersIdListFilteredAtom,
  usersListFilteredBySessionsAtom,
} from "../../statesManager/datasAtom";
import useDebugMode from "../../utils/useDebugMode";
import useFilteredByUsersList from "../../utils/useFilteredByUsersList";

const DashboardProvider = ({ children, siteName, DEBUG_MODE, BASE_URL }) => {
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
          <button onClick={resetAll}>Reset all</button>
          <br />
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                border: "1px solid white",
                padding: 7,
                margin: "1rem",
                lineHeight: "1.323rem",
              }}
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
                <span
                  style={{
                    fontSize: 20,
                    color: "orange",
                    fontWeight: "bold",
                    paddingBottom: "1rem",
                  }}
                >
                  Users number:
                </span>
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
                    <span style={{ color: "red" }}>{id + 1}</span>
                    &ensp;
                    <span style={{ marginBottom: "0.4rem" }}>
                      User Id from server :
                    </span>
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
                lineHeight: "1.321rem",
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
                    <span
                      style={{
                        fontSize: 20,
                        color: "orange",
                        fontWeight: "bold",
                        paddingBottom: "1rem",
                      }}
                    >
                      sessions number :
                    </span>
                    {sessionsUsersIdForCout.map((res, index) => (
                      <Fragment key={index}>
                        <span
                          style={{
                            borderBottom: index % 2 ? "1px dotted red" : "",

                            width: "100%",
                            padding: "1rem",
                            color: index % 2 ? "#61dafb" : "lightgray",
                            fontSize: index % 2 ? 20 : 16,
                            fontWeight: index % 2 ? "bold" : "normal",
                          }}
                        >
                          {res}
                        </span>
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
                    <span
                      style={{
                        fontSize: 20,
                        color: "orange",
                        fontWeight: "bold",
                        paddingBottom: "1rem",
                      }}
                    >
                      Country :
                    </span>
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
                    <span
                      style={{
                        fontSize: 20,
                        color: "orange",
                        fontWeight: "bold",
                        paddingBottom: "1rem",
                      }}
                    >
                      isp :
                    </span>
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
                    <span
                      style={{
                        fontSize: 20,
                        color: "orange",
                        fontWeight: "bold",
                        paddingBottom: "1rem",
                      }}
                    >
                      Country Code:
                    </span>
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
                    <span
                      style={{
                        fontSize: 20,
                        color: "orange",
                        fontWeight: "bold",
                        paddingBottom: "1rem",
                      }}
                    >
                      IP :
                    </span>
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
            <div className="right-side-bar">
              <div
                style={{
                  border: "1px solid white",
                  padding: 7,
                  width: "87%",
                }}
              >
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
                    <span
                      style={{
                        fontSize: 20,
                        color: "orange",
                        fontWeight: "bold",
                        paddingBottom: "1rem",
                      }}
                    >
                      Site Id :
                    </span>
                    <span className="App-link">{res}</span>
                  </span>
                ))}
              </div>
              {usersIdList && (
                <div
                  style={{
                    border: "1px solid white",
                    padding: 7,
                    margin: "1rem",
                    lineHeight: "2.189rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: 20,
                      color: "orange",
                      fontWeight: "bold",
                      paddingBottom: "1rem",
                    }}
                  >
                    Geolocation
                  </span>
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
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default DashboardProvider;
