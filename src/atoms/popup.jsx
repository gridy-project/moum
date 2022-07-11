import {atom} from "recoil";

export const popupState = atom({
  key: "popupState",
  default: false
});

export const globalPopup = atom({
  key: "globalPopup",
  default: <div>No Popup</div>
})