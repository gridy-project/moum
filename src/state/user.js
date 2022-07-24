import { atom } from "recoil";

export const atomSortState = atom({
  key: "pageUserState",
  default: "LATEST"
});

export const atomSelectedCategories = atom({
  key: "customUserCategorySelected",
  default: []
});

export const atomCategories = atom({
  key: "customUserCategory",
  default: {}
});

export const atomSelectMode = atom({
  key: "otherPageSelectMode",
  default: false
});

export const atomSelectedItems = atom({
  key: "otherPageSelectedItems",
  default: []
})

export const atomFloatStatus = atom({
  key: "otherPageFloatStatus",
  default: false
});

export const atomFloatItemActive = atom({
  key: "otherPageFloatItemActive",
  default: false
});

export const atomSearch = atom({
  key: "otherPageLocalSearch",
  default: ""
});

export const atomSelectItemsAll = atom({
  key: "otherPageSelectAll",
  default: false
});