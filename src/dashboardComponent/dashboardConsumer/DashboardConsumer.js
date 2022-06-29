import useDashboardConsumer from "../../hooks/useDashboardConsumer";

const DashboardConsumer = ({ children, DEBUG_MODE, BASE_URL }) => {
  const { pathDatas, finalArray, datas, filteredArr } = useDashboardConsumer({
    BASE_URL,
    DEBUG_MODE,
  });

  return (
    <div>
      {children}
      {DEBUG_MODE ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 12,
              border: "6px solid rgba(255,255,255,0.98)",
              background: "#000",
              paddingBottom: 5,
              paddingTop: 5,
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <span style={{ color: "#61dafb" }}>
              total Count path :{" "}
              <p style={{ color: "#fff" }}>
                {pathDatas?.length > 0 ? pathDatas?.length : 1}
              </p>
            </span>
            <span style={{ color: "#fff" }}>
              <h4 style={{ color: "#61dafb" }}>path with global count</h4>

              <ul
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  listStyle: "none",
                  lineHeight: 2,
                  textAlign: "left",
                }}
              >
                {finalArray.map((result, index) => (
                  <li
                    key={index}
                    style={{ border: "1px dotted white", padding: 4 }}
                  >
                    Page:{" "}
                    <span style={{ color: "#61dafb" }}>{result.page}</span>
                    <br />
                    Count:{" "}
                    <span style={{ color: "#61dafb" }}>{result.count}</span>
                  </li>
                ))}
              </ul>
            </span>
            <br />
            <span style={{ color: "#61dafb" }}>
              Sessions number :{" "}
              <p style={{ color: "#fff" }}>
                {datas?.length > 0 ? filteredArr?.length : 1}
              </p>
            </span>
            <span style={{ color: "#fff" }}>
              <h4 style={{ color: "#61dafb" }}>Json sessions from server</h4>
              {JSON.stringify(filteredArr)}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardConsumer;
