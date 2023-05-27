import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

const Loader = ({ color }) => {
  return (
    <>
      {/* <img className="img-fluid" src="./images/loader1.gif" alt="loader"></img> */}
      <LinearProgress color={color} />
    </>
  );
};

export default Loader;
