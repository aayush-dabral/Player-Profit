const SERVER_HOST = import.meta.env.REACT_APP_API_URL;
const STRIPE_KEY = import.meta.env.REACT_APP_STRIPE_PUBLISH_KEY;
const GOOGLE_MAP_API_KEY = import.meta.env.REACT_APP_GOOGLE_MAP_KEY;

export const API_URL = SERVER_HOST;

export const STRIPE_PUBLISH_KEY = STRIPE_KEY;
export const GOOGLE_MAP_KEY = GOOGLE_MAP_API_KEY;

export const AUTHENTICATE_USER = "api/auth/local";
export const REGISTER_USER = "api/auth/local/register";
export const CHANGE_PASSWORD = "api/auth/change-password";
export const UPDATE_USER = "api/users";
export const GET_USER = "api/users";
export const PROFILE_PHOTO = "api/upload";
export const MENUS = "api/menus?populate=*";
export const HEADERS = "api/header?populate=*";
export const FORGOT_PASSWORD = "api/auth/forgot-password";
export const HOME_PAGE_SETTING = "api/home-pages";
export const SETTING = "api/setting?populate=country";
export const PRIVACY_DATA = "api/privacy-policy";
export const STATIC_PAGE = "api/page/static-page";
export const RESET_PASSWORD = "api/auth/reset-password";
export const FEATURED_CLUBS_NEAR_ME = "api/clubs/featured-near/list?populate=image";
export const BANNER = "api/banner?populate=image";
export const PLAY_NINE_CLUBS = "api/clubs/play-nine/list?populate=image";
export const DRIVING_RANGE_CLUBS_NEAR_ME = "api/clubs/driving-range/list?populate=image";
export const PUTTING_GREEN_CLUBS_NEAR_ME = "api/clubs/green-clubs/list?populate=image";
export const TEACHING_PRO_CLUBS_NEAR_ME = "api/clubs/teaching-pro/list?populate=image";
export const PITCHING_AREA_CLUBS_NEAR_ME = "api/clubs/pitching-area/list?populate=image";
export const NEWS = "api/news-feeds";
export const NEWSLETTER = "api/news-letters";
export const EXPOLRE_GAME = "api/explore-games?populate=image";
export const COUNTRY_LIST = "api/countries";
export const DESTINATION_LIST = "api/destinations?populate=*";
export const REVIEW_RATING = "/api/review-and-ratings";
export const CLUB_DETAIL = "api/clubs";
export const CLUB_POLICY = "api/clubs/club-detail";
export const CLUB_SEARCH = "api/clubs/search-keyword/list";
export const FACILITES = "api/clubs/facility-detail";
export const TODAYS_BEST_DEAL_NEAR_ME = "api/clubs/near-me?populate=*";

export const CLUB_TEE_TIME = "api/tee-times/club";
export const CATCHING_TEETIME = "api/chached/tee-times";

export const BOOK_TEETIME = "api/booking";
export const CREATE_CUSTOMER = "api/payment/create-stripe-customer";
export const CREATE_PAYMENT = "api/payment";

export const QUERY = "api/queries";

export const LIKE = "api/likes/news";
export const LIKE_CLUB = "api/favourite-clubs";

export const CLUB_SORTING_OPTIONS = "api/clubs-sortings";
export const SEARCH_CLUBS = "api/clubs/search/club";

export const COMMENT = "api/comments";

const Config = {
  SERVER_HOST,
};

export default Config;
