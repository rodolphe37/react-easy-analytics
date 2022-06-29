import { Fragment } from "react";

const GeolocationComponent = ({ GEO, usersIdList }) => {
  return (
    <div>
      {GEO && usersIdList && (
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
      {GEO ? (
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
      ) : (
        ""
      )}
    </div>
  );
};

export default GeolocationComponent;
