import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userWithIdAtom } from "../statesManager/datasAtom";
import { userIdAnalytics } from "../utils/userId";

const useControlUserId = () => {
  const [UserWithId, setCreateUserWithId] = useRecoilState(userWithIdAtom);
  const userAlreadyExist = localStorage.getItem("userIdAnalytics");
  const [usersIdList, setUsersIdList] = useState([]);

  const userIdControler = useCallback(() => {
    function ifUserExist() {
      if (userAlreadyExist === null) {
        setCreateUserWithId(userIdAnalytics);
        localStorage.setItem("userIdAnalytics", userIdAnalytics);
      } else if (userAlreadyExist !== null) {
        setCreateUserWithId(userAlreadyExist);
      }
    }
    ifUserExist();
    if (UserWithId && usersIdList?.length === 0) {
      setUsersIdList([UserWithId]);
    } else if (UserWithId && usersIdList?.length >= 1) {
      setUsersIdList([...usersIdList, UserWithId]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAlreadyExist, userIdAnalytics, UserWithId]);

  useEffect(() => {
    userIdControler();
  }, [userIdControler]);
  return { UserWithId, userAlreadyExist, usersIdList };
};

export default useControlUserId;
