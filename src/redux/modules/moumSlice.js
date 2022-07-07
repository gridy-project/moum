import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios"

export const addPieceSimpleThunk = (data) => {
  return async (dispatch) => {
    try {
      const moum = {
        link: data.link,
        status: "PUBLIC",
        boardType: data.type,
      }

      const response = await instance.post("/board/simple", moum);
      console.log(response);
    } catch (err) {
      console.log(err.response);
    }
  }
}

export const addPieceThunk = (data) => {
  return async (dispatch) => {
    if (data.share === "NONE") {
      alert("공유 설정을 선택해주세요");
      return;
    }
    if (data.type === "NONE") {
      alert("조각의 타입을 선택해주세요");
      return;
    }

    try {
      const moum = {
        title: data.subject,
        link: data.link,
        explanation: data.content,
        imgPath: data.image,
        status: data.share,
        boardType: data.type,
        category: data.category,
      }
      const response = await instance.post("/board", moum);
      // dispatch(addData({ id: response.data, ...data }));
      console.log(response);
    } catch (err) {
      console.log(err.response);
    }
  }
}

export const getPieceThunk = () => {
  return async (dispatch) => {
    try {
      const response = await instance.get("/board");
      dispatch(setMoum(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

// export const removeDataDB = (id) => {
//   return async (dispatch) => {
//     try {
//       await instance.delete(`/board/${id}`);
//       dispatch(removeData(id));
//     } catch (err) {
//       window.alert(err.response.data.message);
//     }
//   }
// }

// export const modifyDataDB = (id, data) => {
//   return async (dispatch) => {
//     try {
//       await instance.put(`/board/${id}`, data);
//       dispatch(modifyData({ id, data }));
//     } catch (err) {
//       console.log(err);
//       window.alert(err.response.data.message);
//     }
//   }
// }

//Reducer

const moumSlice = createSlice({
  name: "post",
  initialState: {
    boardList: [],
    folderList: []
  },
  reducers: {
    setMoum: (state, action) => {
      state.boardList = action.payload.boardList;
      state.folderList = action.payload.folderList;
    },
    // addData: (state, action) => {
    //   state.list.boardList.push(action.payload);
    // },
    // removeData: (state, action) => {
    //   state.list.boardList = state.list.boardList.filter(
    //     (post) => {
    //       if (post.id === action.payload) {
    //         return false;
    //       } else {
    //         return true;
    //       }
    //     }
    //   )
    // },
    // modifyData: (state, action) => {
    //   state.list.boardList = state.list.boardList.map(
    //     (post) => {
    //       if (post.id === action.payload.id) {
    //         return {
    //           ...post,
    //           title: action.payload.data.title,
    //           content: action.payload.data.content
    //         }
    //       } else {
    //         return post;
    //       }
    //     }
    //   );
    // }
  }
});

export const { setMoum } = moumSlice.actions;
export default moumSlice.reducer;