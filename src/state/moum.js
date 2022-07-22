import { atom } from "recoil";

export const pageMoumSelectedFolderId = atom({
  key: "page/Moum/selectedFolderId",
  default: 0
});

export const selectedCategories = atom({
  key: "page/Moum/selectedCategories",
  default: []
});

export const moumCategories = atom({
  key: "page/Moum/categories",
  default: {}
});

export const moumSort = atom({
  key: "page/Moum/sort",
  default: "최신 조각순"
});

export const moumSearch = atom({
  key: "page/Moum/search",
  default: ""
});

export const pieceSelectMode = atom({
  key: "pieceSelectMode",
  default: false
});

export const selectedItems = atom({
  key: "selectedItems",
  default: []
})