import { useCallback } from "react";

const useFilteredByUsersList = () => {
  const usersIdFiltered = useCallback((value, setValue, valueToSearch) => {
    let combinedArray = [];
    let uniq = {};
    combinedArray.push(...value.map((r, id) => r.usersId));
    const merged = [].concat.apply([], combinedArray);
    const arrFiltered = merged.filter(
      (obj) => !uniq[obj.userId] && (uniq[obj.userId] = true)
    );

    if (setValue) {
      return setValue(arrFiltered);
    } else return arrFiltered;
  }, []);
  return {
    usersIdFiltered,
  };
};

export default useFilteredByUsersList;
