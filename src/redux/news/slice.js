import { createSlice } from "@reduxjs/toolkit";
import {
  getNewsList,
  searchNews,
  getNewsDetails,
  likeNews,
  addNewsComment,
} from "./actions";

const initialState = {
  newsList: [],
  searchNewsList: [],
  newsDetails: null,
};

const slice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewsList.fulfilled, (state, action) => {
      if (action?.payload?.status === 200) {
        state.newsList = action?.payload?.data?.data;
      }
    });
    builder.addCase(searchNews.fulfilled, (state, action) => {
      if (action?.payload?.status === 200) {
        state.searchNewsList = action?.payload?.data;
      }
    });
    builder.addCase(getNewsDetails.fulfilled, (state, action) => {
      if (action?.payload?.status === 200) {
        state.newsDetails = action?.payload?.data?.data;
      }
    });
    builder.addCase(likeNews.fulfilled, (state, action) => {
      if (action?.payload?.status === 200) {
        // state.newsDetails?.attributes?.likes?.data?.push(action.payload.data);
        state.newsDetails?.attributes?.likes?.data?.push({
          id: "",
          attributes: {
            userId: action.payload.newsData.userId,
            createdAt: "",
            updatedAt: "",
          },
        });
      } else if (action?.payload?.status === 204) {
        state.newsDetails.attributes.likes.data =
          state.newsDetails.attributes.likes.data?.filter(
            (e) => e.attributes?.userId !== action.payload.newsData.userId
          );
      }
    });
    builder.addCase(addNewsComment.fulfilled, (state, action) => {
      if (action?.payload?.status === 200) {
        state.newsDetails?.attributes?.comments?.data?.push(
          action.payload.data?.data
        );
      }
    });
  },
});

export default slice.reducer;
