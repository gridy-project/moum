import { configureStore } from "@reduxjs/toolkit";

import user from "./modules/userSlice";
import post from "./modules/postSlice";
import option from "./modules/optionSlice";

const store = configureStore({
  reducer: { user, post, option },
});

export default store;