import { atom } from "recoil";

export const atomSelectedCategories = atom({
  key: "page/Moum/selectedCategories",
  default: []
});

export const atomMoumCategories = atom({
  key: "page/Moum/categories",
  default: {}
});

export const atomMoumSort = atom({
  key: "page/Moum/sort",
  default: "최신 조각순"
});

export const atomMoumSearch = atom({
  key: "page/Moum/search",
  default: ""
});

export const atomPieceSelectMode = atom({
  key: "pieceSelectMode",
  default: false
});

export const atomSelectedItems = atom({
  key: "selectedItems",
  default: []
});


export const atomMoum = {
  modeSelectAll: atom({
    key: "atomMoum/modeSelectAll",
    default: false
  }),
}