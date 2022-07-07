import { configureStore } from "@reduxjs/toolkit";

import user from "./modules/userSlice";
import moum from "./modules/moumSlice";
import option from "./modules/optionSlice";
import profile from "./modules/profileSlice"

const store = configureStore({
  reducer: { user, moum, option, profile },
});

export default store;