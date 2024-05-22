import React, { useEffect, useRef } from "react";
import "./css/style.css";

export default function HomeBanner() {
  const ref = useRef(null);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  
  const scrollToRef = () => {
    window.scrollTo({ top: ref.current.offsetHeight, behavior: "smooth" });
  };

  return (
    <div className="container-fluid m-0 p-0" ref={ref}>
      <div className="banner">
        <div className="container bg-transparent" style={{ marginTop: "45vh" }}>
          <div className="row bg-transparent">
            <div className="col-12 bg-transparent text-center">
              <h2 className="text-light bg-transparent animate__animate animate__zoomIn animate__delay-5s">
                Elevate Your Style, Own the Street
              </h2>
              <div className="m-3 btn btn-outline-light" onClick={scrollToRef}>
                Shop Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}