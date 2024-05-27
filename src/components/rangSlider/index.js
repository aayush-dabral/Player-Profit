import React from "react";
import tw from "tailwind-styled-components";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function RangSlider(props) {
  const [value, setValue] = React.useState([5, 20]);

  const handleChange = (event, newValue) => {
    if (newValue[0] === value[0] && newValue[1] === value[1]) {
    } else {
      setValue(newValue);
      props.value(newValue);
    }
  };

  function valuetext(value) {}

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#FFBC00",
      },
    },
  });

  return (
    <Container>
      <div className="w-[82px] h-[26px] self-end mb-[-10px]">
        <p className={txt}>{`${value[0]}:00 - ${value[1]}:00`}</p>
      </div>
      <div className="w-full h-[25px]">
        <ThemeProvider theme={theme}>
          <Slider
            getAriaLabel={() => "Time range"}
            value={value}
            min={5}
            max={20}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            size="small"
            color="secondary"
          />
        </ThemeProvider>
      </div>
    </Container>
  );
}

const Container = tw.div`
w-full
h-full
flex
flex-col
`;
const txt = `
text-xs 
leading-loose 
uppercase 
text-dark-8 
`;

export default RangSlider;
