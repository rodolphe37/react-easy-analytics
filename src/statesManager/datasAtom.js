import { atom } from "recoil";

export const datasAtom = atom({
  key: "datasAtom",
  default: [],
});

export const geolocationArrayAtom = atom({
  key: "geolocationArrayAtom",
  default: null,
});

export const userWithIdAtom = atom({
  key: "userWithIdAtom",
  default: "",
});

export const siteNameAtom = atom({
  key: "siteNameAtom",
  default: "",
});

export const isLoadedAtom = atom({
  key: "isLoadedAtom",
  default: false,
});
