import { atom } from "recoil";

export const globalPopup = atom({
  key: "globalPopup",
  default: {
    state: false,
    component: <div>No Popup</div>
  }
});

export const globalFloat = atom({
  key: "floatState",
  default: {
    state: false,
    component: <div>No Float</div>
  }
});