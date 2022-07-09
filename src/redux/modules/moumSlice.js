import { createSlice } from "@reduxjs/toolkit";
import { getMoumAll, getPieceInFolder } from "../../api/moum";
import { addPieceSimple, addPieceSimpleInFolder, modifyPiece, removePiece } from "../../api/piece";
import { getUserInfo, getUserInfoForMoum } from "../../api/user";

export const addPieceSimpleThunk = (id, moum) => async (dispatch) => {
  console.log(id, moum);
  const { result } = (id === 0) ? await addPieceSimple(moum) : await addPieceSimpleInFolder(id, moum);

  if (result) {
  } else {
    console.log("추가 실패");
  }
}

export const getPieceThunk = () => async (dispatch) => {
  const { result, data } = await getMoumAll();
  if (result) {
    dispatch(setMoumRedux(data));
  } else {
    console.log("조각 불러오기 실패");
  }
};

export const getPieceInFolderThunk = (id) => async (dispatch) => {
  const { result, data } = await getPieceInFolder(id);
  if (result) {
    console.log(data);
    dispatch(setPieceInFolderRedux(data));
  } else {
    console.log("조각 불러오기 실패");
  }
}

export const removePieceThunk = (id) => async (dispatch) => {
  const { result } = await removePiece(id);
  if (result) {
    dispatch(removePieceRedux(id));
  } else {
    console.log("조각 삭제 실패");
  }
}

export const modifyPieceThunk = (piece) => async (dispatch) => {
  const passData = {
    link: piece.link,
    status: piece.share,
    boardType: piece.type,
    category: piece.category,
    title: piece.subject,
    explanation: piece.content,
    imgPath: piece.image
  }

  const { result } = await modifyPiece(piece.id, passData);

  if (result) {
    dispatch(modifyPieceRedux({ id: piece.id, passData }));
  } else {
    console.log("조각 변경 실패");
  }
}

export const getUserInfoMineThunk = () => async (dispatch) => {
  const { result, data } = await getUserInfo();
  if (result) {
    dispatch(setUserInfo(data));
    const { result: result2, data: data2 } = await getUserInfoForMoum(data.id);
    if (result2) {
      dispatch(setUserInfoMore(data2));
    }
  } else {
    console.log("유저 정보 조회 실패");
  }
}

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
      state.boardList = action.payload.boardList;
      state.folderList = action.payload.folderList;
    },
    setPieceInFolderRedux: (state, action) => {
      state.folderId = action.payload.id;
      state.boardList = action.payload.boardList;
    },
    removePieceRedux: (state, action) => {
      state.boardList = state.boardList.filter((post) => (post.id !== action.payload));
    },
    modifyPieceRedux: (state, action) => {
      state.boardList = state.boardList.map((post) => (post.id === action.payload.id) ?
        { id: post.id, ...action.payload.passData } : post);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserInfoMore: (state, action) => {
      state.userInfoMore = action.payload;
    }
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