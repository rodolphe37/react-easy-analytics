import axios from "axios";
import { useRecoilState } from "recoil";
import { useEffectOnce } from "./useEffectOnce";
import { datasAtom, isLoadedAtom } from "../statesManager/datasAtom";

const useGetData = ({ BASE_URL }) => {
  const [datas, setDatas] = useRecoilState(datasAtom);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedAtom);

  const getData = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/siteAnalytics`);

      if (resp) {
        setDatas(resp.data.data);
      } else {
        setDatas({});
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
      await getData({ signal });
    }
    if (datas.length === 0) {
      handleStatus();
      setIsLoaded(true);
    }

    return () => {
      controller.abort(signal);
      setIsLoaded(false);
    };
  }, [datas]);

  return {
    datas,
    isLoaded,
    getData,
  };
};

export default useGetData;
