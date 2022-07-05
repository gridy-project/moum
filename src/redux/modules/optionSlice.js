import { createSlice } from "@reduxjs/toolkit";


const postSlice = createSlice({
  name: "post",
  initialState: {
    backgroundColor: "#FFFFFF"
  },
  reducers: {
    setBackground: (state, action) => {
      state.backgroundColor = action.payload;
    },
  }
});

export const { setBackground } = postSlice.actions;
export default postSlice.reducer;