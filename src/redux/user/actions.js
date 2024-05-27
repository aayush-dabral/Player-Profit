import { GET_USER, PROFILE_PHOTO, UPDATE_USER } from "./types";
import {
  updateUserApi,
  profilePhotoApi,
  getUserApi,
} from "../../services/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateUser = createAsyncThunk(UPDATE_USER, async (data) => {
  try {
    const response = await updateUserApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const profilePhoto = createAsyncThunk(PROFILE_PHOTO, async (data) => {
  try {
    const response = await profilePhotoApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const getUser = createAsyncThunk(GET_USER, async (data) => {
  try {
    const response = await getUserApi(data);
    return response;
  } catch (err) {
    return err;
  }
});
