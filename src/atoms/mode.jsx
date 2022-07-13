import { atom } from "recoil";

export const pieceSelectMode = atom({
  key: "pieceSelectMode",
  default: false
});

export const selectedItems = atom({
  key: "selectedItems",
  default: []
})