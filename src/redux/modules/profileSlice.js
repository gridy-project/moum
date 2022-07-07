import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios"

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
      console.log(id);
      console.log(data);
      await instance.put(`/user/pw/update/${id}`, data);
      dispatch(modifyPassword({ id, data }));
    } catch (err) {
      console.log(err);
      // window.alert(err.response.data.message);
    }
  }
}

export const deleteProfileDB = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await instance.delete(`/user/getout/${id}`, data);
      dispatch(deleteProfile(response.data));
      console.log(response.data)
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

// Reducer
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    list: {}
  },
  reducers: {
    setProfile: (state, action) => {
      state.list = action.payload;
    },
    modifyProfile: (state, action) => {
      state.list = state.list.filter(
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
      state.list.push(action.payload);
    },
    modifyPassword: (state, action) => {
      state.list = state.list.filter(
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