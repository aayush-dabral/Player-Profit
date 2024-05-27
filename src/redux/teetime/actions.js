import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FEATURED_CLUBS_NEAR_ME,
  BEST_CLUBS_IN_COUNTRY,
  BANNER,
  TODAYS_BEST_DEAL_NEAR_ME,
  PLAY_NINE_CLUBS,
  DRIVING_RANGE_CLUBS_NEAR_ME,
  PUTTING_GREEN_CLUBS_NEAR_ME,
  TEACHING_PRO_CLUBS_NEAR_ME,
  PITCHING_AREA_CLUBS_NEAR_ME,
  EXPOLRE_GAME,
  COUNTRY_LIST,
  REVIEW_RATING,
  DESTINATION_LIST,
  CLUB_DETAIL,
  CLUB_POLICY,
  CLUB_TEE_TIME,
  CATCHING_TEETIME,
  CLUB_SEARCH,
} from "./types";
import {
  getFeaturedClubsNearMeApi,
  searchClubsApi,
  getBannerApi,
  getTodaysBestClubDealsNearMeApi,
  getPlayNineClubsApi,
  getDrivingRangeClubsNearMeApi,
  getPuttingGreenClubsNearMeApi,
  getTeachingProClubsNearMeApi,
  getPitchingAreaClubsNearMeApi,
  exploreGameApi,
  getCountrysListApi,
  reviewRatingApi,
  getDestinationListApi,
  getClubDetailApi,
  getClubPolicyApi,
  clubTeeTimeApi,
  clubCachedTeeTimeApi,
  clubSearchApi,
} from "../../services/apis";

export const getFeaturedClubsNearMe = createAsyncThunk(
  FEATURED_CLUBS_NEAR_ME,
  async (data) => {
    try {
      const response = await getFeaturedClubsNearMeApi();
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const getBestClubsInCountry = createAsyncThunk(
  BEST_CLUBS_IN_COUNTRY,
  async (data) => {
    try {
      const response = await searchClubsApi(data);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const getBanner = createAsyncThunk(BANNER, async (data) => {
  try {
    const response = await getBannerApi();
    return response;
  } catch (err) {
    return err;
  }
});

export const getTodaysBestClubDealsNearMe = createAsyncThunk(
  TODAYS_BEST_DEAL_NEAR_ME,
  async (data) => {
    try {
      const response = await getTodaysBestClubDealsNearMeApi(data);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const getPlayNineClubs = createAsyncThunk(
  PLAY_NINE_CLUBS,
  async (data) => {
    try {
      const response = await getPlayNineClubsApi();
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const getDrivingRangeClubsNearMe = createAsyncThunk(
  DRIVING_RANGE_CLUBS_NEAR_ME,
  async (data) => {
    try {
      const response = await getDrivingRangeClubsNearMeApi();
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const getPuttingGreenClubsNearMe = createAsyncThunk(
  PUTTING_GREEN_CLUBS_NEAR_ME,
  async (data) => {
    try {
      const response = await getPuttingGreenClubsNearMeApi();
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const getTeachingProClubsNearMe = createAsyncThunk(
  TEACHING_PRO_CLUBS_NEAR_ME,
  async (data) => {
    try {
      const response = await getTeachingProClubsNearMeApi();
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const getPitchingAreaClubsNearMe = createAsyncThunk(
  PITCHING_AREA_CLUBS_NEAR_ME,
  async (data) => {
    try {
      const response = await getPitchingAreaClubsNearMeApi();
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const exploreGameList = createAsyncThunk(EXPOLRE_GAME, async (data) => {
  try {
    const response = await exploreGameApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const getCountrysList = createAsyncThunk(COUNTRY_LIST, async (data) => {
  try {
    const response = await getCountrysListApi();
    return response;
  } catch (err) {
    return err;
  }
});

export const getDestinationList = createAsyncThunk(
  DESTINATION_LIST,
  async (data) => {
    try {
      const response = await getDestinationListApi(data);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const getClubDetail = createAsyncThunk(CLUB_DETAIL, async (data) => {
  try {
    const response = await getClubDetailApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const getClubPolicy = createAsyncThunk(CLUB_POLICY, async (data) => {
  try {
    const response = await getClubPolicyApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const getClubTeeTime = createAsyncThunk(CLUB_TEE_TIME, async (data) => {
  try {
    const response = await clubTeeTimeApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const getClubCachedTeeTime = createAsyncThunk(
  CATCHING_TEETIME,
  async (data) => {
    try {
      const response = await clubCachedTeeTimeApi(data);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const reviewRating = createAsyncThunk(REVIEW_RATING, async (data) => {
  try {
    const response = await reviewRatingApi(data);
    return response;
  } catch (err) {
    return err;
  }
});

export const clubSearchApiList = createAsyncThunk(CLUB_SEARCH, async (data) => {
  try {
    const response = await clubSearchApi(data);
    return response;
  } catch (err) {
    return err;
  }
});
