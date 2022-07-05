import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: true,
    isLogin: false,
  },
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLogin = action.payload;
      if (state.isLoading) {
        state.isLoading = false;
      }
    }
  },
});

export const { setLoginStatus } = userSlice.actions;
export default userSlice.reducer;
