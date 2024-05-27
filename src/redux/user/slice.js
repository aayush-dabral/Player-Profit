import { createSlice } from "@reduxjs/toolkit";
import { getUser, profilePhoto, updateUser } from "./actions";
import { Storage } from "../../utils";

const initialState = {
  coordinates: null,
  recentSearches: [],
  recentViewedNews: [],
  userdata: [],
  image: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
    upsertRecentSearches: (state, action) => {
      state.recentSearches = action.payload;
    },
    upsertRecentViewedNews: (state, action) => {
      state.recentViewedNews = action.payload;
    },
    deleteUserData: (state, action) => {
      state.userdata = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userdata = action?.payload?.data;
      let userData = {
        jwt: JSON.parse(localStorage.getItem("authentication"))?.jwt,
        user: action?.payload?.data,
      };
      Storage.save(Storage.AUTHENTICATION, JSON.stringify(userData));
      Storage.save(Storage.USER_DATA, JSON.stringify(action?.payload?.data));
    });
    builder.addCase(profilePhoto.fulfilled, (state, action) => {
      state.image = action?.payload?.data;
      //localStorage.setItem("userImage",action.payload.data)
      let userImg = {
        images: action?.payload?.data,
      };
    });
  },
});

export const {
  setCoordinates,
  upsertRecentSearches,
  upsertRecentViewedNews,
  deleteUserData,
} = slice.actions;
export default slice.reducer;
