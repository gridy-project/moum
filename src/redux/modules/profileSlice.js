import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/axios"

// Middleware
// 프로필 보기
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

// 계정 프로필 사진 업로드
export const uploadPhotoDB = (formData, config) => {
  return async (dispatch) => {
    try {
      const response = await instance.post("/user/profilePhoto", formData, config);
      const imageUrl = response.data.url;
      dispatch(uploadPhoto({ imgPath: imageUrl }))
    } catch (err) {
      // console.log(err.response.data)
    }
  }
}

// 계정 닉네임 수정
export const modifyNicknameDB = (data) => {
  return async (dispatch) => {
    console.log(data)
    try {
      await instance.put("/user/updateName/", data, { headers: { "Content-Type": "application/json" } });
      dispatch(modifyNickname(data));
    } catch (err) {
      console.log(err);
      window.alert(err.response.data.message);
    }
  }
}

// 계정 설명 수정
export const modifyDescDB = (data) => {
  return async (dispatch) => {
    console.log(data)
    try {
      await instance.put("/user/updateInfo/", data);
      dispatch(modifyDesc(data));
    } catch (err) {
      console.log(err);
      // window.alert(err.response.data.message);
    }
  }
}

// 계정 비밀번호 수정
export const modifyPasswordeDB = (data) => {
  return async (dispatch) => {
    console.log(data)
    try {
      await instance.put("/user/pw/update/", data);
      dispatch(modifyPassword(data));
    } catch (err) {
      console.log(err);
      // window.alert(err.response.data.message);
    }
  }
}

// 계정 탈퇴
export const deleteProfileDB = () => {
  return async (dispatch) => {
    try {
      const response = await instance.delete("/user/getout/");
      dispatch(deleteProfile(response.data));
      window.location.replace("/login")
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
    uploadPhoto: (state, action) => {
      state.info = { ...state.info, ...action.payload };
    },
    modifyNickname: (state, action) => {
      state.info = { ...state.info, ...action.payload };
    },
    modifyPassword: (state, action) => {
      state.info = { ...state.info, ...action.payload };
    },
    modifyDesc: (state, action) => {
      state.info = { ...state.info, ...action.payload };
    },
    deleteProfile: (state, action) => {
      state.info = { ...state.info, ...action.payload };
    },
  }
});


export const { setProfile, uploadPhoto, modifyPassword, modifyNickname, modifyDesc, deleteProfile } = profileSlice.actions;
export default profileSlice.reducer;