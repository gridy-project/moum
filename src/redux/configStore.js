import { configureStore } from "@reduxjs/toolkit";

import option from "./modules/optionSlice";
import profile from "./modules/profileSlice";

const store = configureStore({
  reducer: { option, profile },
});

export default store;