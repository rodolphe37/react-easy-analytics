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
            <div
              style={{
                border: "1px solid white",
                padding: 7,
                width: "30%",
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
            <div>
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
                  <span
                    style={{
                      color: "white",
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-around",
                      border: "1px dotted red",
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
                          padding: 11,
                        }}
                      >
                        <span style={{ color: "red" }}>{index + 1}</span>
                        &ensp; latitude:
                        <span className="App-link">{res.latitude}</span>
                        longitude:
                        <span className="App-link">{res.longitude}</span>
                      </span>
                    ))}
                  </span>
                </div>
              )}
              <div
                style={{
                  color: "white",
                  display: "grid",
                  gridTemplateColumns: "repeat(6,1fr)",
                  border: "1px solid white",
                  padding: 7,
                  margin: "1rem",
                  lineHeight: "1.321rem",
                }}
              >
                <div
                  style={{
                    padding: 7,

                    lineHeight: "1rem",
                    border: "1px dotted red",
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
                        padding: "1rem",
                        width: "90%",
                        borderBottom: "1px dotted red",
                        paddingTop: "1rem",
                        paddingBottom: "1.8rem",
                      }}
                    >
                      Users number:
                    </span>
                    <span
                      className="App-link"
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        padding: 15,
                        width: "90%",
                        borderBottom: "1px dotted red",
                      }}
                    >
                      {usersIdList.length}
                    </span>
                  </span>
                  <div style={{}}>
                    {usersIdList &&
                      usersIdList.map((res, id) => (
                        <span
                          key={id}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-around",
                            paddingBottom: 15,
                            borderBottom: "1px dotted red",
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
                </div>
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
                          paddingTop: "1rem",
                          paddingBottom: "3rem",
                        }}
                      >
                        sessions number :
                      </span>
                      {sessionsUsersIdForCout.map((res, index) => (
                        <Fragment key={index}>
                          <span
                            style={{
                              borderBottom: index % 2 ? "1px dotted red" : "",
                              display: index % 1 ? "none" : "",
                              width: "100%",
                              padding: "1rem",
                              borderTop: index === 0 ? "1px dotted red" : "",
                              color: index % 2 ? "#61dafb" : "lightgray",
                              fontSize: index % 2 ? 20 : 16,
                              fontWeight: index % 2 ? "bold" : "normal",
                            }}
                          >
                            {index % 2 ? res : ""}
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
                          paddingTop: "1.6rem",
                          paddingBottom: "3rem",
                        }}
                      >
                        Country :
                      </span>
                      {usersIdList.map((res, index) => (
                        <span
                          key={index}
                          style={{
                            borderTop: "1px dotted red",
                            display: "flex",
                            width: "100%",
                            height: "100%",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        >
                          <Fragment>
                            <span style={{ color: "red" }}>{index + 1}</span>

                            <span className="App-link">{res.country}</span>
                          </Fragment>
                        </span>
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
                          paddingTop: "1.4rem",
                          paddingBottom: "3rem",
                        }}
                      >
                        isp :
                      </span>
                      {usersIdList.map((res, index) => (
                        <span
                          key={index}
                          style={{
                            borderTop: "1px dotted red",
                            display: "flex",
                            width: "100%",
                            height: "100%",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        >
                          <Fragment>
                            <span style={{ color: "red" }}>{index + 1}</span>

                            <span className="App-link">{res.isp}</span>
                          </Fragment>
                        </span>
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
                          paddingTop: "1.4rem",
                          paddingBottom: "3rem",
                        }}
                      >
                        Country Code:
                      </span>
                      {usersIdList.map((res, index) => (
                        <span
                          key={index}
                          style={{
                            borderTop: "1px dotted red",
                            display: "flex",
                            width: "100%",
                            height: "100%",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        >
                          <Fragment>
                            <span style={{ color: "red" }}>{index + 1}</span>

                            <span className="App-link">
                              {" "}
                              {res.country_code}
                            </span>
                          </Fragment>
                        </span>
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
                          paddingTop: "1.4rem",
                          paddingBottom: "3rem",
                        }}
                      >
                        IP :
                      </span>
                      {usersIdList.map((res, index) => (
                        <span
                          key={index}
                          style={{
                            borderTop: "1px dotted red",
                            display: "flex",
                            width: "100%",
                            height: "100%",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        >
                          <Fragment>
                            <span style={{ color: "red" }}>{index + 1}</span>

                            <span
                              className="App-link"
                              style={{ filter: "blur(3px)" }}
                            >
                              {" "}
                              {res.ip}
                            </span>
                          </Fragment>
                        </span>
                      ))}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="right-side-bar"></div>
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default DashboardProvider;
