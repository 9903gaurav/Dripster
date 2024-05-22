import "./Loading.css";
import React from "react";

export default function Loading() {
  return (
    <div
      className=""
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h3 style={{ color: "rgb(255,255,255)", marginRight:"10px" }}>Loading Your Closet</h3>
      <div className="waveform">
        <div className="waveform__bar"></div>
        <div className="waveform__bar"></div>
        <div className="waveform__bar"></div>
        <div className="waveform__bar"></div>
      </div>
    </div>
  );
}
