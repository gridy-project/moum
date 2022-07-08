import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/axios"

// Middleware
export const getProfileDB = () => {
  return async (dispatch) => {
    try {
      const response = await instance.get("/user/profile");
      dispatch(setProfile(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

// export const uploadPhotoDB = (id, formdata, config) => {
//   return async (dispatch) => {
//     try {
//       const response = await instance.post(`/user/profilePhoto/${id}`, formData, config);
//       const url = response.data.url;
//       dispatch(uploadPhoto(response.data))
//     } catch (err) {
//       console.log(err.response.data)
//     }
//   }
// }

export const modifyProfileDB = (id, data) => {
  return async (dispatch) => {
    try {
      await instance.put(`/user/update/${id}`, data);
      dispatch(modifyProfile({ id, data }));
    } catch (err) {
      console.log(err);
      // window.alert(err.response.data.message);
    }
  }
}

export const modifyNicknameDB = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await instance.put(`/user/updateName/${id}`, data);
      console.log(response)
      dispatch(modifyNickname({ id, data }));
    } catch (err) {
      console.log(err);
      // window.alert(err.response.data.message);
    }
  }
}

export const modifyDescDB = (id, data) => {
  return async (dispatch) => {
    try {
      await instance.put(`/user/updateInfo/${id}`, data);
      dispatch(modifyDesc({ id, data }));
    } catch (err) {
      console.log(err);
      // window.alert(err.response.data.message);
    }
  }
}
export const modifyPasswordeDB = (id, data) => {
  return async (dispatch) => {
    try {
      await instance.put(`/user/pw/update/${id}`, data);
      dispatch(modifyPassword({ id, data }));
    } catch (err) {
      console.log(err);
      // window.alert(err.response.data.message);
    }
  }
}

export const deleteProfileDB = (id) => {
  return async (dispatch) => {
    try {
      const response = await instance.delete(`/user/getout/${id}`);
      dispatch(deleteProfile(response.data));
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

// Reducer
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    info: {}
  },
  reducers: {
    setProfile: (state, action) => {
      state.info = action.payload;
    },
    // uploadPhoto: (state, action) => {
    //   state.info.push(action.payload);
    // },
    modifyProfile: (state, action) => {
      state.info = state.info.filter(
        (post) => {
          if (post.id === action.payload) {
            return false;
          } else {
            return true;
          }
        }
      )
    },
    modifyNickname: (state, action) => {
      state.info = state.info.filter(
        (post) => {
          if (post.id === action.payload) {
            return false;
          } else {
            return true;
          }
        }
      )
    },
    modifyPassword: (state, action) => {
      state.info = state.info.filter(
        (post) => {
          if (post.id === action.payload) {
            return false;
          } else {
            return true;
          }
        }
      )
    },
    modifyDesc: (state, action) => {
      state.info = state.info.filter(
        (post) => {
          if (post.id === action.payload) {
            return false;
          } else {
            return true;
          }
        }
      )
    },
    deleteProfile: (state, action) => {
      state.info.push(action.payload);
    },
  }
});


export const { setProfile, modifyProfile, modifyPassword, modifyNickname, modifyDesc, deleteProfile } = profileSlice.actions;
export default profileSlice.reducer;