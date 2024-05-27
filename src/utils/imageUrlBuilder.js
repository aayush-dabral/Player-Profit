import { API_URL } from "../utils/config";

export const imageUrlBuilder = (endponit) => {
  if (endponit) {
    const url = API_URL.slice(0, -1) + endponit;
    return url;
  } else {
    // return (bg)
  }
};
export const imageUrlUpdater = (endponit) => {
  let lg = window.matchMedia("(max-width: 850px)").matches ? true : false;
  let md = window.matchMedia("(max-width: 600px)").matches ? true : false;
  let sm = window.matchMedia("(max-width: 450px)").matches ? true : false;

  if (sm && endponit?.formats?.small) {
    let urls = {
      path: API_URL.slice(0, -1) + endponit?.formats?.small?.url,
      width: endponit?.formats?.small?.width,
      height: endponit?.formats?.small?.height,
    };
    return urls;
  } else if (md && endponit?.formats?.medium) {
    let urls = {
      path: API_URL.slice(0, -1) + endponit?.formats?.medium?.url,
      width: endponit?.formats?.medium?.width,
      height: endponit?.formats?.medium?.height,
    };
    return urls;
  } else if (lg && endponit?.formats?.large) {
    let urls = {
      path: API_URL.slice(0, -1) + endponit?.formats?.large?.url,
      width: endponit?.formats?.large?.width,
      height: endponit?.formats?.large?.height,
    };
    return urls;
  } else {
    let urls = {
      path: API_URL.slice(0, -1) + endponit?.url,
      width: endponit?.width,
      height: endponit?.height,
    };
    return urls;
  }
};
