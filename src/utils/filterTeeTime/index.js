import React from "react";
import dayjs from "dayjs";
import _ from "lodash";

export function filterTeeTimeData(props) {
  if (props) {
    let currentTimeFilter;

    currentTimeFilter = _.filter(props, function (e) {
      if (dayjs(e?.time).format("D") === dayjs().format("D")) {
        return dayjs(e?.time).format("HHmm") > dayjs().format("HHmm");
      } else {
        return e;
      }
    });

    return currentTimeFilter;

    // let filterForMorning = _.filter(currentTimeFilter, function (e) {
    //   return dayjs(e?.time).format("H") < 10;
    // });

    // let filterForMidDay = _.filter(currentTimeFilter, function (e) {
    //   return dayjs(e?.time).format("H") > 9 && dayjs(e?.time).format("H") < 15;
    // });

    // let filterForEvening = _.filter(currentTimeFilter, function (e) {
    //   return dayjs(e?.time).format("H") > 14;
    // });

    // let timeData = [
    //   {
    //     type: filterForMorning.length > 0 ? "Morning Tee Times" : "",
    //     where: filterForMorning.length > 0 ? currentTimeFilter[0]?.course : "",
    //     data: filterForMorning.length > 0 ? filterForMorning : null,
    //   },
    //   {
    //     type: filterForMidDay.length > 0 ? "Mid-day Tee Times" : "",
    //     where: filterForMidDay.length > 0 ? currentTimeFilter[0]?.course : "",
    //     data: filterForMidDay.length > 0 ? filterForMidDay : null,
    //   },
    //   {
    //     type: filterForEvening.length > 0 ? "Afternoon Tee Times" : "",
    //     where: filterForEvening.length > 0 ? currentTimeFilter[0]?.course : "",
    //     data: filterForEvening ? filterForEvening : null,
    //   },
    // ];

    // return timeData;
  } else {
    return {};
  }
}
