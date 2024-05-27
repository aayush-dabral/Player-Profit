export const AUTHENTICATION = "authentication";
export const USER_TOKEN = "UserToken";
export const USER_DATA = "UserData";
export const RESET_TOKEN = "ResetToken";
export const RECENT_SEARCHES = "recent_searches";
export const RECENT_VIEWED_NEWS = "recent_viewed_news";
export const ADD_TO_CARTS_DATA = "AddToCartsData";
export const LOCAL_CART_DATA = "LocalCartData";

export const get = async (key) => {
  try {
    return await localStorage.getItem(key);
  } catch (e) {}
};

export const save = async (key, value) => {
  try {
    await localStorage.setItem(key, value);
  } catch (e) {}
};

export const remove = async (key) => {
  try {
    await localStorage.removeItem(key);
  } catch (e) {}
};
