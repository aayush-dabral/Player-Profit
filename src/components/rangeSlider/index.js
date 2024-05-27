import { memo } from "react";
import { currenyFormatter } from "../../utils/helper-functions";
const RangeSlider = ({ maxAmount, sliderValue, setSliderValue }) => {
  return (
    <div className="w-full xl:w-1/2">
      <input
        type="range"
        min="0"
        className="w-full cursor-pointer"
        max={maxAmount}
        value={sliderValue}
        onChange={(e) => setSliderValue(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <p>{currenyFormatter.format(sliderValue)}</p>
        <p>{currenyFormatter.format(maxAmount - sliderValue)}</p>
      </div>
    </div>
  );
};
export default memo(RangeSlider);
