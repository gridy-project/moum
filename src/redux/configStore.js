import { configureStore } from "@reduxjs/toolkit";

import user from "./modules/userSlice";
import option from "./modules/optionSlice";
import profile from "./modules/profileSlice";

const store = configureStore({
  reducer: { user, option, profile },
});

export default store;