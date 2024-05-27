import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AUTHENTICATE_USER,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  REGISTER_USER,
  RESET_PASSWORD,
} from "./types";
import {
  authenticateUserApi,
  registerUserApi,
  forgotPasswordApi,
  changePasswordApi,
  resetPasswordApi,
} from "../../services/apis";

export const authenticateUser = createAsyncThunk(
  AUTHENTICATE_USER,
  async (data) => {
    try {
      const response = await authenticateUserApi(data);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const registerUser = createAsyncThunk(REGISTER_USER, async (data) => {
  try {
    const response = await registerUserApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const changePassword = createAsyncThunk(
  CHANGE_PASSWORD,
  async (data) => {
    try {
      const response = await changePasswordApi(data);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  FORGOT_PASSWORD,
  async (data) => {
    try {
      const response = await forgotPasswordApi(data);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const resetPassword = createAsyncThunk(RESET_PASSWORD, async (data) => {
  try {
    const response = await resetPasswordApi(data);
    return response;
  } catch (err) {
    return err;
  }
});
