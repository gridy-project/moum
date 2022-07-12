import { configureStore } from "@reduxjs/toolkit";

import user from "./modules/userSlice";
import option from "./modules/optionSlice";

const store = configureStore({
  reducer: { user, option },
});

export default store;