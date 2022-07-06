import { configureStore } from "@reduxjs/toolkit";

import user from "./modules/userSlice";
import post from "./modules/postSlice";
import option from "./modules/optionSlice";
import profile from "./modules/profileSlice"

const store = configureStore({
  reducer: { user, post, option, profile },
});

export default store;