import { configureStore } from "@reduxjs/toolkit";

import user from "./modules/userSlice";
import moum from "./modules/moumSlice";
import option from "./modules/optionSlice";
import profile from "./modules/profileSlice";
import share from "./modules/shareSlice";

const store = configureStore({
  reducer: { user, moum, option, profile, share },
});

export default store;