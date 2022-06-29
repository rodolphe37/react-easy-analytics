import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
import useControlUserId from "../../hooks/useControlUserId";
import useTodayDate from "../../hooks/useTodayDate";

const AnalyticsConsumer = ({ children, BASE_URL }) => {
  const pagePathView = window.location.pathname;
  const { userAlreadyExist } = useControlUserId();
  const { todayMls } = useTodayDate();

  const isSended = useRef(false);

  const postData = useCallback(async () => {
    const obj = {
      status: "published",
      userId: userAlreadyExist,
      date: todayMls,
      pagesView: pagePathView,
    };

    try {
      console.log(
        "%cPost consumer data to server - In progress",
        "color: orange;  font-weight:bold; padding: 2px"
      );

      await axios
        .post(`${BASE_URL}/pathAnalytics`, obj)
        .then((res) => {
          if (res) {
            console.log(
              "%cPost path to server - OK",
              "color: green;  font-weight:bold; padding: 2px"
            );
          }
        })
        .then(() => {
          console.log(
            "%cUpdating data - In progress",
            "color: orange;  font-weight:bold; padding: 2px"
          );
        })
        .then(() => {
          console.log(
            "%cData updated - OK",
            "color: green;  font-weight:bold; padding: 2px"
          );
        });
    } catch (error) {
      console.error(
        "%cSend to server - ERROR",
        "color: red;  font-weight:bold; padding: 2px",
        error
      );
    }
  }, [BASE_URL, pagePathView, todayMls, userAlreadyExist]);

  useEffect(() => {
    if (isSended.current) return;
    const sendPathToServer = async () => {
      await postData();
    };
    if (!isSended.current && userAlreadyExist) {
      sendPathToServer();
      isSended.current = true;
    }
  }, [userAlreadyExist, postData]);

  useEffect(() => {
    console.log("page path", pagePathView);
    console.log("date", todayMls);
    console.log("userId", userAlreadyExist);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAlreadyExist, pagePathView]);

  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default AnalyticsConsumer;
