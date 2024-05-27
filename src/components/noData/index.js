import React from "react";
import tw from "tailwind-styled-components";
import { Text } from "@components";

function NoData(props) {
  return (
    <Container>
      <Text className={`text-[28px] font-bold ${props?.className}`}>
        {props?.data || "Data not found"}
      </Text>
    </Container>
  );
}

const Container = tw.div`
flex 
justify-center
items-center
w-[100%]
h-[150px]
`;

export default NoData;
