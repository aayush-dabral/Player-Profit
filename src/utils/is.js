export const isEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isPassword = (password) => {
  return password?.length === 0 || password?.length > 0 ? true : false;
};
export const isPhoneNumber = (phone) => {
  return phone?.length >= 6 ? true : false;
};
export const isPostalCode = (phone) => {
  return phone?.length >= 4 ? true : false;
};

export const isValidNumber = (val) => {
  const re = /^[0-9\b]+$/;
  return re.test(val);
};

export function isValidSearch(text) {
  const re = /^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+\s?$/;
  return re.test(text);
}
