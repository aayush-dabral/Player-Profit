import { createSlice } from "@reduxjs/toolkit";
import { authenticateUser, registerUser, resetPassword } from "./actions";
import { Storage } from "../../utils";

const initialState = {
  userData: null,
  resetToken: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userData = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.userData = action?.payload?.data;
      action?.payload?.status === 200 &&
        Storage.save(
          Storage.AUTHENTICATION,
          JSON.stringify(action?.payload?.data)
        );
      action?.payload?.status === 200 &&
        Storage.save(
          Storage.USER_TOKEN,
          JSON.parse(JSON.stringify(action?.payload?.data?.jwt))
        );
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {});
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.resetToken = action?.meta?.arg?.token;
      Storage.save(Storage.RESET_TOKEN, action?.meta?.arg?.token);
    });
  },
});

export const { setUserDetails } = slice.actions;

export default slice.reducer;
