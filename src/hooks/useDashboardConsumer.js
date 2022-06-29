import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { datasAtom } from "../statesManager/datasAtom";
import { useEffectOnce } from "./useEffectOnce";
import useGetPathData from "./useGetPathData";

const useDashboardConsumer = ({ BASE_URL, DEBUG_MODE }) => {
  const [datas] = useRecoilState(datasAtom);
  const { pathDatas, getPathData } = useGetPathData({ BASE_URL });
  const [pagesViewCounted, setPagesViewCounted] = useState({});
  const [finalArray, setFinalArray] = useState([]);

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

  function find_duplicate_in_array(array) {
    const count = {};
    const result = [];

    array.forEach((item) => {
      if (count[item]) {
        count[item] += 1;
        return;
      }
      count[item] = 1;
    });

    for (let prop in count) {
      if (count[prop] >= 2) {
        result.push([{ page: prop, count: count[prop] }]);
      }
    }

    const merged = [].concat.apply([], result);
    setFinalArray(merged);
    return merged;
  }

  useEffect(() => {
    setPagesViewCounted(
      find_duplicate_in_array(pathDatas.map((res) => res.pagesView))
    );
  }, [pathDatas]);

  useEffect(() => {
    if (DEBUG_MODE && finalArray.length > 0) {
      console.group("Consumer = DEBUG_MODE ACTIF");
      console.group("Pages path with count");
      console.table([pagesViewCounted]);
      console.groupEnd();
      console.groupEnd();
    }
  }, [pagesViewCounted, finalArray, DEBUG_MODE]);

  return {
    pathDatas,
    finalArray,
    datas,
    filteredArr,
  };
};

export default useDashboardConsumer;
