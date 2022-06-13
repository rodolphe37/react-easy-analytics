import { useCallback, useEffect, useRef, useState } from "react";
import useControlUserId from "./useControlUserId";
import useTodayDate from "./useTodayDate";

import { useLocalStorage } from "../hooks/useLocalStorage";

const useSessionNumbers = () => {
  const { todayMls } = useTodayDate();
  const numberOfPastSessions = localStorage.getItem("sessionNumber");
  const [sessionNumbers, setSessionNumbers] = useState(
    Number(localStorage.getItem("sessionNumber") || 0)
  );
  const { userAlreadyExist } = useControlUserId();
  const [userSessionObject, setUserSessionObject] = useLocalStorage(
    "userSessionObject",
    []
  );

  let IsMounted = useRef(false);

  const incrementCount = useCallback(() => {
    if (numberOfPastSessions !== sessionNumbers) {
      setSessionNumbers(sessionNumbers + 1);

      if (userSessionObject.length === 0) {
        setUserSessionObject([
          {
            date: todayMls,
            sessionNumber: sessionNumbers,
          },
        ]);
      } else {
        setUserSessionObject([
          ...userSessionObject,
          {
            date: todayMls,
            sessionNumber: sessionNumbers,
          },
        ]);
      }
    }
  }, [
    sessionNumbers,
    numberOfPastSessions,
    userSessionObject,
    todayMls,
    setUserSessionObject,
  ]);

  useEffect(() => {
    IsMounted.current = true;
    if (numberOfPastSessions !== sessionNumbers) {
      localStorage.setItem(
        "sessionNumber",
        userSessionObject.length > 0 ? userSessionObject.length : 1
      );
    }

    return () => {
      IsMounted.current = false;
    };
  }, [
    numberOfPastSessions,
    sessionNumbers,
    userSessionObject,
    userAlreadyExist,
  ]);

  return {
    sessionNumbers,
    incrementCount,
    userSessionObject,
  };
};

export default useSessionNumbers;
