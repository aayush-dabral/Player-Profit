import React from "react";
import { RotatingLines } from "react-loader-spinner";

import "./style.css"
function Loader({ height, width }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <RotatingLines
        visible={true}
        height={height ? height : "7%"}
        width={width ? width : "7%"}
        color="#b8e834"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      /> */}
      <div class="loader">
        <div class="square" ></div>
        <div class="square"></div>
        <div class="square last"></div>
        <div class="square clear"></div>
        <div class="square"></div>
        <div class="square last"></div>
        <div class="square clear"></div>
        <div class="square "></div>
        <div class="square last"></div>
      </div>
    </div>
  );
}

export default Loader;
