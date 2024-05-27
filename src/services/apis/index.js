import axios from "axios";
import { Storage } from "../../utils";
import {
  API_URL,
  AUTHENTICATE_USER,
  REGISTER_USER,
  CLUB_SORTING_OPTIONS,
  SEARCH_CLUBS,
  CATCHING_TEETIME,
  CLUB_DETAIL,
  CLUB_POLICY,
  CLUB_TEE_TIME,
  HOME_PAGE_SETTING,
  SETTING,
  PRIVACY_DATA,
  STATIC_PAGE,
  NEWS,
  NEWSLETTER,
  LIKE,
  COMMENT,
  LIKE_CLUB,
  BOOK_TEETIME,
  MENUS,
  HEADERS,
  CREATE_CUSTOMER,
  CREATE_PAYMENT,
  FACILITES,
  CLUB_SEARCH,
  QUERY,
  FEATURED_CLUBS_NEAR_ME,
  BANNER,
  TODAYS_BEST_DEAL_NEAR_ME,
  PLAY_NINE_CLUBS,
  DRIVING_RANGE_CLUBS_NEAR_ME,
  PUTTING_GREEN_CLUBS_NEAR_ME,
  TEACHING_PRO_CLUBS_NEAR_ME,
  PITCHING_AREA_CLUBS_NEAR_ME,
  EXPOLRE_GAME,
  DESTINATION_LIST,
  COUNTRY_LIST,
  UPDATE_USER,
  REVIEW_RATING,
  PROFILE_PHOTO,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
} from "../../utils/config";
import Config, { GET_USER } from "../../utils/config";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000000,
});

instance.interceptors.request.use(
  async function (request) {
    let userDetails = await Storage.get(Storage.USER_TOKEN);
    if (userDetails) {
      let token = localStorage.getItem("accessToken");
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const authenticateUserApi = (data) => {
  return instance.post(AUTHENTICATE_USER, data);
};
export const registerUserApi = (data) => {
  return instance.post(REGISTER_USER, data);
};
export const updateUserApi = (data) => {
  return instance.put(`${UPDATE_USER}/${data?.id}`, data?.data);
};
export const changePasswordApi = (data) => {
  return instance.post(CHANGE_PASSWORD, data);
};
export const getUserApi = (data) => {
  return instance.get(`${GET_USER}/${data}?populate=*`);
};
export const profilePhotoApi = (data) => {
  return instance.post(PROFILE_PHOTO, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const resetPasswordApi = (data) => {
  return instance.post(`${RESET_PASSWORD}`, data, {
    headers: { Authorization: `Bearer ${data?.token}` },
  });
};
export const reviewRatingApi = (data) => {
  return instance.post(`${REVIEW_RATING}`, data);
};
export const catchingTeetimeApi = (data) => {
  return instance.get(
    `${CATCHING_TEETIME}/${data.id}?bookingDate=${data.bookingDate}&holes=${data.holes}&players=${data.players}`
  );
};
export const menus = (data) => {
  return instance.get(MENUS, data);
};

export const header = (data) => {
  return instance.get(HEADERS, data);
};
export const getClubDetailApi = (data) => {
  return instance.get(`${CLUB_DETAIL}/${data}?populate=*`);
};
export const getClubPolicyApi = (data) => {
  return instance.get(`${CLUB_POLICY}/${data}?populate=*`);
};
export const clubTeeTimeApi = (data) => {
  return instance.get(
    `${CLUB_TEE_TIME}/${data?.clubId}?bookingDate=${data?.bookingDate}&holes=${data?.holes}&players=${data?.players}`
  );
};
export const clubCachedTeeTimeApi = (data) => {
  return instance.get(
    `${CATCHING_TEETIME}/${data?.clubId}?bookingDate=${data?.bookingDate}&holes=${data?.holes}&players=${data?.players}`
  );
};
export const getHomePageSettingApi = () => {
  return instance.get(HOME_PAGE_SETTING);
};
export const getSettingApi = () => {
  return instance.get(SETTING);
};
export const getPrivacyDataApi = () => {
  return instance.get(PRIVACY_DATA);
};
export const getCancellationPolicyApi = (slug) => {
  return instance.get(`${STATIC_PAGE}/${slug}`);
};
export const getTermsApi = (slug) => {
  return instance.get(`${STATIC_PAGE}/${slug}`);
};
export const forgotPasswordApi = (data) => {
  return instance.post(FORGOT_PASSWORD, data);
};
export const bookingTeetimeApi = (data) => {
  return instance.post(BOOK_TEETIME, data);
};
export const createCustomerApi = (data) => {
  return instance.post(CREATE_CUSTOMER, data);
};
export const createpaymentApi = (data) => {
  return instance.post(CREATE_PAYMENT, data);
};
export const getFacilitieApi = (data) => {
  return instance.get(`${FACILITES}/${data}`);
};
export const clubSearchApi = (data) => {
  return instance.get(`${CLUB_SEARCH}?search=${data?.toLowerCase()}`);
};
export const queryApi = (data) => {
  return instance.post(QUERY, data);
};

export const newsApi = (id) => {
  return instance.get(`${NEWS}/${id ?? ""}`, { params: { populate: "*" } });
};
export const newsLetterApi = (data) => {
  return instance.post(NEWSLETTER, data);
};
export const searchNewsApi = (data) => {
  return instance.get(`${NEWS}/search`, { params: { populate: "*", ...data } });
};
export const likeApi = (id) => {
  return instance.post(`${LIKE}/${id}`);
};
export const addCommentApi = (data) => {
  return instance.post(COMMENT, data);
};
export const addFavClubApi = (id) => {
  return instance.post(`${LIKE_CLUB}/${id}`);
};
export const getFavClubApi = () => {
  return instance.get(`${LIKE_CLUB}`);
};

export const clubSortingOptionsApi = () => {
  return instance.get(CLUB_SORTING_OPTIONS);
};
export const searchClubsApi = (data) => {
  return instance.get(SEARCH_CLUBS, { params: data });
};

export const getFeaturedClubsNearMeApi = () => {
  return instance.get(FEATURED_CLUBS_NEAR_ME);
};
export const getBannerApi = () => {
  return instance.get(BANNER);
};
export const getTodaysBestClubDealsNearMeApi = (data) => {
  return instance.post(TODAYS_BEST_DEAL_NEAR_ME, data);
};
export const getPlayNineClubsApi = () => {
  return instance.get(PLAY_NINE_CLUBS);
};
export const getDrivingRangeClubsNearMeApi = () => {
  return instance.get(DRIVING_RANGE_CLUBS_NEAR_ME);
};
export const getPuttingGreenClubsNearMeApi = () => {
  return instance.get(PUTTING_GREEN_CLUBS_NEAR_ME);
};
export const getTeachingProClubsNearMeApi = () => {
  return instance.get(TEACHING_PRO_CLUBS_NEAR_ME);
};
export const getPitchingAreaClubsNearMeApi = () => {
  return instance.get(PITCHING_AREA_CLUBS_NEAR_ME);
};
export const exploreGameApi = (data) => {
  return instance.get(EXPOLRE_GAME);
};
export const getCountrysListApi = () => {
  return instance.get(COUNTRY_LIST);
};
export const getDestinationListApi = (data) => {
  return instance.get(DESTINATION_LIST);
};
