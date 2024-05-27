import { createSlice } from "@reduxjs/toolkit";
import {
  getHomePageSetting,
  raiseQuery,
  getSetting,
  getPrivacyData,
  getCancellationPolicy,
  getTerms,
} from "./actions";
import _ from "lodash";

const initialState = {
  homePageSetting: [],
  setting: null,
  cancellPolicy: null,
  termsData: null,
  privacyData: null,
};

const slice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomePageSetting.fulfilled, (state, action) => {
      state.homePageSetting = _.sortBy(
        _.filter(action?.payload?.data?.data, {
          attributes: { isVisible: true },
        }),
        ["id"]
      );
    });
    builder.addCase(getSetting.fulfilled, (state, action) => {
      state.setting = action?.payload?.data;
    });
    builder.addCase(getPrivacyData.fulfilled, (state, action) => {
      state.privacyData = action?.payload?.data;
    });
    builder.addCase(getCancellationPolicy.fulfilled, (state, action) => {
      state.cancellPolicy = action?.payload?.data;
    });
    builder.addCase(getTerms.fulfilled, (state, action) => {
      state.termsData = action?.payload?.data;
    });
    builder.addCase(raiseQuery.fulfilled, (state, action) => {});
  },
});

export default slice.reducer;
