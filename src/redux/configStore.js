import { configureStore } from "@reduxjs/toolkit";

import option from "./modules/optionSlice";

const store = configureStore({
  reducer: { option },
});

export default store;