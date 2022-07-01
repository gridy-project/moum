import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false
  },
  reducers: {
  },
});

export const { } = userSlice.actions;
export default userSlice.reducer;
