import { createSlice } from "@reduxjs/toolkit";

//Reducer
const moumSlice = createSlice({
  name: "moum",
  initialState: {
    folderId: 0,
    boardList: [],
    folderList: [],
    userInfo: {},
    userInfoMore: {},
  },
  reducers: {
    setMoumRedux: (state, action) => {
      state.folderId = 0;
    },
  }
});

export const {
  setMoumRedux,
  removePieceRedux,
  modifyPieceRedux,
  setUserInfo,
  setUserInfoMore,
  setPieceInFolderRedux,

} = moumSlice.actions;
export default moumSlice.reducer;