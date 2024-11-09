import React from "react";
import './ShimmerEffect.css';

const ShimmerEffect = () => {
  return (
    <div className="countries-container">
      {Array.from({ length: 10 }).map((el, i) => {
        return <div key={i} className="country-card h-[350px]"></div>;
      })}
    </div>
  );
};

export default ShimmerEffect;
