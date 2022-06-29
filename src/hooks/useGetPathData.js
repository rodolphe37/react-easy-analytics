import axios from "axios";
import { useRecoilState } from "recoil";
import { useEffectOnce } from "./useEffectOnce";
import { isLoadedAtom, pathDatasAtom } from "../statesManager/datasAtom";

const useGetPathData = ({ BASE_URL }) => {
  const [pathDatas, setPathDatas] = useRecoilState(pathDatasAtom);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedAtom);

  const getPathData = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/pathAnalytics`);

      if (resp) {
        setPathDatas(resp.data.data);
      } else {
        setPathDatas({});
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffectOnce(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function handleStatus() {
      const controller = new AbortController();
      const signal = controller.signal;
      await getPathData({ signal });
    }
    if (pathDatas.length === 0) {
      handleStatus();
      setIsLoaded(true);
    }

    return () => {
      controller.abort(signal);
      setIsLoaded(false);
    };
  }, [pathDatas]);

  return {
    pathDatas,
    isLoaded,
    getPathData,
  };
};

export default useGetPathData;
