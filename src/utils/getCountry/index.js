import React from "react";
import axios from "axios";

export function getCountry(props) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${props?.lat}&lon=${
        props?.lng
      }&cnt=15&units=metric&appid=${"c164ad065360bac38905bb4be3d5dd19"}`
    )
    .then((response) => {
      if (response?.data?.sys?.country) {
        let regionNames = new Intl.DisplayNames(["en"], {
          type: "region",
        });
        let countryName = regionNames.of(response?.data?.sys?.country);
        return countryName;
      }
    })
    .catch((error) => {});
}
