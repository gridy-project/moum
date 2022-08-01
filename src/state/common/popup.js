import { atom } from "recoil";

export const globalPopup = atom({
  key: "globalPopup",
  default: {
    state: false,
    component: <div>No Popup</div>
  }
});

export const globalBottomFloat = atom({
  key: "globalBottomFloatState",
  default: {
    state: false,
    component: <div>No Float</div>
  }
});

export const globalMessageFloat = atom({
  key: "globalMessageFloat",
  default: {
    state: false,
    icon: null,
    message: "메세지 없음"
  }
});