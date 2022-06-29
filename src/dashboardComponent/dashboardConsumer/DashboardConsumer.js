import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import useGetPathData from "../../hooks/useGetPathData";
import { datasAtom } from "../../statesManager/datasAtom";

const DashboardConsumer = ({ children, DEBUG_MODE, BASE_URL }) => {
  const [datas] = useRecoilState(datasAtom);
  const { pathDatas, getPathData } = useGetPathData({ BASE_URL });
  const [pagesViewCounted, setPagesViewCounted] = useState({});

  useEffectOnce(() => {
    if (pathDatas === null) {
      try {
        getPathData();
      } catch (error) {
        console.error("Request failed:", error);
      }
    }
  }, [getPathData]);

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

  useEffect(() => {
    const count = {};
    pathDatas
      .map((res) => res.pagesView)
      .forEach((element, id) => {
        count[element] = (count[element] || 0) + 1;
      });

    setPagesViewCounted(count);
  }, [pathDatas]);

  useEffect(() => {
    if (DEBUG_MODE && pagesViewCounted !== {}) {
      console.group("Consumer = DEBUG_MODE ACTIF");
      console.group("Pages path with count");
      console.table([pagesViewCounted]);
      console.groupEnd();
      console.groupEnd();
    }
  }, [pagesViewCounted, DEBUG_MODE]);

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

              <ul>
                {Object.entries(pagesViewCounted).map((resu, value) => (
                  <li key={value}>{JSON.stringify(resu)}</li>
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
