import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import EastIcon from "@mui/icons-material/East";
// import { Storage, updateRecentData } from "@utils";
import { Text, HeadingText, Root } from "@components";
import { getCountrysList } from "@redux/teetime/actions";
import { upsertRecentSearches } from "@redux/user/slice";

export const ExploreCountrys = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countryList } = useSelector((store) => store.teetimeReducer);
  const { recentSearches } = useSelector((store) => store.userReducer);

  const [state, setState] = useState({
    date: dayjs(),
    search: "",
  });

  useEffect(() => {
    dispatch(getCountrysList());
  }, []);

  const updateRecentSearches = async (e) => {
    let recentSearchesData = [...recentSearches];
    updateRecentData(recentSearchesData, e);
    dispatch(upsertRecentSearches(recentSearchesData));
    Storage.save(Storage.RECENT_SEARCHES, JSON.stringify(recentSearchesData));
  };

  const onSearch = (e) => {
    if (!e && state.search) {
      alert("Please retry your search entry.");
      return;
    }

    let query = `?date=${state.date}`;

    if (e?.club) {
      query = query + "&name=" + e.club;
    }
    if (e?.place) {
      query = query + "&place=" + e.place;
    }
    if (e?.country) {
      query = query + "&country=" + e.country;
    }
    if (e?.slug) {
      query = query + "&slug=" + e.slug;
    } else if (e) {
      updateRecentSearches(e);
    }

    navigate({
      pathname: `/search`,
      search: query,
    });
  };

  return (
    <div className="py-10 bg-[#E5E2FF]">
      <Root>
        <div className="w-full h-auto flex flex-col items-center justify-center">
          <HeadingText className={`text-[28px] font-semibold`}>
            {item?.attributes?.title || "Explore course by countries"}
          </HeadingText>
          <div className="w-full h-auto flex flex-wrap gap-4 mt-6">
            {countryList?.map((client) => (
              <button
                className="px-6 py-4 flex flex-row bg-[white] text-[#004996] hover:bg-[#004996] hover:text-[white] shadow-[0_0px_15px_0px_#cdcaec] rounded-md items-center justify-around gap-x-4"
                onClick={() => onSearch({ country: client?.attributes?.name })}
              >
                <Text className="">{client?.attributes?.name}</Text>
                {/* <img src={vectorBg} className="w-[32px] h-[13px]" alt="" /> */}
                <EastIcon sx={{ color: "inherit" }} />
              </button>
            ))}
          </div>
        </div>
      </Root>
    </div>
  );
};
