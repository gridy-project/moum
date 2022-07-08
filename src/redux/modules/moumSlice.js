import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/axios"
import { getMoumAll } from "../../api/moum";
import { addPieceSimple, modifyPiece, removePiece } from "../../api/piece";

export const addPieceSimpleThunk = (moum) => {
  return async (dispatch) => {
    const { result, data } = await addPieceSimple({
      link: moum.content,
      status: "PRIVATE",
      boardType: moum.type,
      category: "기타",
    });

    if (result) {
      console.log("추가 성공");
    } else {
      console.log("추가 실패");
    }
  }
}

export const getPieceThunk = () => {
  return async (dispatch) => {
    const { result, data } = await getMoumAll();
    if (result) {
      dispatch(setMoumRedux(data));
    } else {
      console.log("불러오기 실패");
    }
  };
};

export const removePieceThunk = (id) => {
  return async (dispatch) => {
    const { result, data } = await removePiece(id);
    if (result) {
      dispatch(removePieceRedux(id));
    } else {
      console.log("삭제 실패");
    }
  }
}

export const modifyPieceThunk = (piece) => {
  return async (dispatch) => {
    const passData = {
      link: piece.link,
      status: piece.share,
      boardType: piece.type,
      category: piece.category,
      title: piece.subject,
      explanation: piece.content,
      imgPath: piece.image
    }

    const { result, data } = await modifyPiece(piece.id, passData);

    if (result) {
      console.log("변경 성공");
      dispatch(modifyPieceRedux({ id: piece.id, passData }));
    } else {
      console.log("변경 실패");
    }
  }
}

//Reducer

const moumSlice = createSlice({
  name: "post",
  initialState: {
    boardList: [],
    folderList: []
  },
  reducers: {
    setMoumRedux: (state, action) => {
      state.boardList = action.payload.boardList;
      state.folderList = action.payload.folderList;
    },
    // addData: (state, action) => {
    //   state.list.boardList.push(action.payload);
    // },
    removePieceRedux: (state, action) => {
      state.boardList = state.boardList.filter((post) => {
        if (post.id === action.payload) {
          return false;
        } else {
          return true;
        }
      })
    },
    modifyPieceRedux: (state, action) => {
      state.boardList = state.boardList.map(
        (post) => {
          if (post.id === action.payload.id) {
            return { id: post.id, ...action.payload.passData }
          } else {
            return post;
          }
        }
      );
    }
  }
});

export const { setMoumRedux, removePieceRedux, modifyPieceRedux } = moumSlice.actions;
export default moumSlice.reducer;