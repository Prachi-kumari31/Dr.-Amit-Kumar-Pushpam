import React from "react";
import {
  LoaderCircle,
} from "lucide-react";

import "./LoadingState.css";

const LoadingState = ({
  message = "Loading...",
  fullPage = false,
}) => {
  return (
    <div
      className={`loading-state ${
        fullPage
          ? "loading-state-full"
          : ""
      }`}
    >
      <div className="loading-state-spinner">
        <LoaderCircle size={30} />
      </div>

      <p>{message}</p>
    </div>
  );
};

export default LoadingState;