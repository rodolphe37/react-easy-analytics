import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userWithIdAtom } from "../statesManager/datasAtom";
import { userIdAnalytics } from "../utils/userId";

const useControlUserId = () => {
  const userIdUtil = userIdAnalytics;
  const [UserWithId, setCreateUserWithId] = useRecoilState(userWithIdAtom);
  const userAlreadyExist = localStorage.getItem("userIdAnalytics");

  const userIdControler = useCallback(() => {
    function ifUserExist() {
      if (userIdUtil && userAlreadyExist === null) {
        setCreateUserWithId(userIdUtil);
        localStorage.setItem("userIdAnalytics", userIdUtil);
      } else if (userAlreadyExist !== null) {
        setCreateUserWithId(userAlreadyExist);
      }
    }
    ifUserExist();
  }, [userAlreadyExist, userIdUtil, setCreateUserWithId]);

  useEffect(() => {
    userIdControler();
  }, [userIdControler]);
  return { UserWithId, userAlreadyExist };
};

export default useControlUserId;
