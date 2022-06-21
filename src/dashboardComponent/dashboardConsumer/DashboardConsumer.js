import { useRecoilState } from "recoil";
import { datasAtom } from "../../statesManager/datasAtom";

const DashboardConsumer = ({ children, DEBUG_MODE }) => {
  const [datas] = useRecoilState(datasAtom);

  const filteredArr = datas
    ?.map((res) => res.session[0])
    .reduce((acc, current) => {
      const x = acc.find((item) => item.date === current.date);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

  return (
    <div>
      {children}
      {DEBUG_MODE ? (
        <div
          style={{
            // position: "absolute",
            // bottom: "10px",
            // left: 0,
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
