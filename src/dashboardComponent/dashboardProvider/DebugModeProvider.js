import { Fragment } from "react";

const DebugModeProvider = ({
  usersIdList,
  sessionsUsersIdForCout,
  sitesList,
  DEBUG_MODE,
}) => {
  return (
    <div>
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
                maxWidth: 150,
                marginBottom: "2rem",
              }}
            >
              Open devtool to see the console.
            </q>
          </div>

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
    </div>
  );
};

export default DebugModeProvider;
