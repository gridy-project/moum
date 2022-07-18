import {atom} from "recoil";

export const popupState = atom({
  key: "popupState",
  default: false
});

export const globalPopup = atom({
  key: "globalPopup",
  default: <div>No Popup</div>
});

export const floatState = atom({
  key: "floatState",
  default: false
});

export const globalFloat = atom({
  key: "globalFloat",
  default: <div>No Float</div>
});