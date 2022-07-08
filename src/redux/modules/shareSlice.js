import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "share",
  initialState: {
    moum: {
      modify: {
        state: false,
        data: {}
      }
    }
  },
  reducers: {
    setMoumModifyState: (state, action) => {
      state.moum.modify.state = action.payload;
    },
    setMoumModifyData: (state, action) => {
      state.moum.modify.data = action.payload;
    }
  },
});

export const { setMoumModifyState, setMoumModifyData, resetMoumModifyData } = userSlice.actions;
export default userSlice.reducer;
