import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="/Img/loading.gif"
        alt="loadingImg"
        className
        style={{ width: "600px" }}
      />
      <h1>Now Loading...</h1>
    </div>
  );
};

export default Loading;
