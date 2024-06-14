import React from "react";
import "./skeleton.css";

function SkeletonLoader() {
  return (
    <div className="flex justify-between items-center px-3 py-5 border-b">
      <div className="flex items-center gap-3">
        <div className="skeleton skeleton-avatar"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
      <div className="skeleton skeleton-button"></div>
    </div>
  );
}

export default SkeletonLoader;
