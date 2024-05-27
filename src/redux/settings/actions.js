import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  HOME_PAGE_SETTING,
  RAISE_QUERY,
  SETTING,
  PRIVACY_DATA,
  CANCELL_POLICY,
  TERMS_DATA,
} from "./types";
import {
  getHomePageSettingApi,
  queryApi,
  getSettingApi,
  getPrivacyDataApi,
  getCancellationPolicyApi,
  getTermsApi,
} from "../../services/apis";

export const getHomePageSetting = createAsyncThunk(
  HOME_PAGE_SETTING,
  async (data) => {
    try {
      const response = await getHomePageSettingApi();
      return response;
    } catch (err) {
      return err;
    }
  }
);
export const getSetting = createAsyncThunk(SETTING, async (data) => {
  try {
    const response = await getSettingApi();
    return response;
  } catch (err) {
    return err;
  }
});

export const getPrivacyData = createAsyncThunk(PRIVACY_DATA, async (data) => {
  try {
    const response = await getPrivacyDataApi();
    return response;
  } catch (err) {
    return err;
  }
});

export const getCancellationPolicy = createAsyncThunk(
  CANCELL_POLICY,
  async (data) => {
    try {
      const response = await getCancellationPolicyApi(data);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const getTerms = createAsyncThunk(TERMS_DATA, async (data) => {
  try {
    const response = await getTermsApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const raiseQuery = createAsyncThunk(RAISE_QUERY, async (data) => {
  try {
    const response = await queryApi(data);
    return response;
  } catch (err) {
    return err;
  }
});
