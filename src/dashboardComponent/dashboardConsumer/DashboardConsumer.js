import { useRecoilState } from "recoil";
import useDatasController from "../../controller/useDatasController";
import useSessionNumbers from "../../hooks/useSessionNumbers";
import { datasAtom } from "../../statesManager/datasAtom";

const DashboardConsumer = ({ children, DEBUG_MODE }) => {
  const { userSessionObject } = useSessionNumbers();
  const [datas] = useRecoilState(datasAtom);
  const [analyticsData] = useDatasController({ userSessionObject });

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
            position: "absolute",
            bottom: "10px",
            left: 0,
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
              <h4 style={{ color: "#61dafb" }}>
                Json sessions from localStorage
              </h4>
              {JSON.stringify(analyticsData)}
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
