import React from "react";
import "../style.css";

const Solution = () => {
  return (
    <div className="solution-container">
      <div className="solution-content">
        <h1 className="solution-h1">Solutions We Provide</h1>
        <p className="solution-para">
          We never stop inventing. We have over 100,000 patents to prove it.
        </p>
      </div>

      <div className="solution-cate">
        <div className="solution-single-cate">
          <img className="solution-img" src="/img/solCate.png" alt="" />
          <img className="shades" src="/img/shade.png" alt="" />
          <div className="solution-single-cate-content">
            <h1 className="solution-single-cate-h1">Applications</h1>
            <a href="/application">
              <button className="transparent-button">View All</button>
            </a>
          </div>
        </div>

        <div className="solution-single-cate">
          <img className="solution-img" src="/img/solCate2.png" alt="" />
          <img className="shades" src="/img/shade.png" alt="" />
          <div className="solution-single-cate-content">
            <h1 className="solution-single-cate-h1">Markets</h1>
            <a href="/market">
              <button className="transparent-button">View All</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solution;
