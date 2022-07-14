import { atom } from "recoil";

export const pageMoumSelectedFolderId = atom({
  key: "page/Moum/selectedFolderId",
  default: 0
});

export const selectedCategories = atom({
  key: "page/Moum/selectedCategories",
  default: []
});