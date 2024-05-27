import React from "react";
import tw from "tailwind-styled-components";
import { Text } from "@components";
import "../../App.css";

function RoundHole(props) {
  const { className, onClick, active } = props;
  return (
    <Container onClick={onClick} className={className}>
      <Text className={`text-[18px] `}>{props.children}</Text>
    </Container>
  );
}

const Container = tw.div`
w-[40px]
h-[40px]
border-[rgba(151,151,151,0.8)]
rounded-full
flex
justify-center
items-center
webkitHighlight
`;

export default RoundHole;
