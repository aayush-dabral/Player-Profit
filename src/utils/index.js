import dayjs from "dayjs";
import _ from "lodash";

// import { RECENT_DATA_COUNT } from "./constants";
export { isEmail, isPassword, isPhoneNumber, isPostalCode } from "./is";
export * as Storage from "./storage";
export { filterTeeTimeData } from "./filterTeeTime";
export { getCountry } from "./getCountry";
// export { CARD_TYPES } from "./constants";
export { imageUrlBuilder } from "./imageUrlBuilder";
export { imageUrlUpdater } from "./imageUrlBuilder";

// export function updateRecentData(array, element) {
//   if (!_.some(array, element)) {
//     if (array.length === RECENT_DATA_COUNT) {
//       array.pop();
//     }
//     array.splice(0, 0, element);
//   }
// }

export function getFullName(user) {
  if (!user) return null;
  const { firstName, lastName } = user;
  return lastName ? `${firstName} ${lastName}` : firstName;
}

export function getNextDays(date, count = 5) {
  return Array.from({ length: count }).map((_, i) => dayjs(date).add(i, "day"));
}

export function toRad(Value) {
  return (Value * Math.PI) / 180;
}

export function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371 * 0.621371; // miles
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}
