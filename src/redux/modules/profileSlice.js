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
    deleteProfile: (state, action) => {
      state.info.push(action.payload);
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
  }
});


export const { setProfile, modifyProfile, deleteProfile, modifyPassword } = profileSlice.actions;
export default profileSlice.reducer;