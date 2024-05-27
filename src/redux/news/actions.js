import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_NEWS_LIST,
  SEARCH_NEWS,
  GET_NEWS_DETAILS,
  LIKE_NEWS,
  NEWS_LETTER,
  ADD_NEWS_COMMENT,
} from "./types";
import {
  newsApi,
  searchNewsApi,
  newsLetterApi,
  likeApi,
  addCommentApi,
} from "../../services/apis";

export const getNewsList = createAsyncThunk(GET_NEWS_LIST, async () => {
  try {
    const response = await newsApi();
    return response;
  } catch (err) {
    return err;
  }
});

export const newsLetter = createAsyncThunk(NEWS_LETTER, async (data) => {
  try {
    const response = await newsLetterApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const searchNews = createAsyncThunk(SEARCH_NEWS, async (data) => {
  try {
    const response = await searchNewsApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const getNewsDetails = createAsyncThunk(GET_NEWS_DETAILS, async (id) => {
  try {
    const response = await newsApi(id);
    return response;
  } catch (err) {
    return err;
  }
});

export const likeNews = createAsyncThunk(LIKE_NEWS, async (data) => {
  try {
    const response = await likeApi(data?.id);
    response.newsData = data;
    return response;
  } catch (err) {
    return err;
  }
});

export const addNewsComment = createAsyncThunk(
  ADD_NEWS_COMMENT,
  async (data) => {
    try {
      const response = await addCommentApi(data);
      return response;
    } catch (err) {
      return err;
    }
  }
);
