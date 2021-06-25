import React from "react";
import "./LoadingContainer.scss";
// @ts-ignore
import { CoffeeLoading } from "react-loadingg";

interface Props {
  isOpen: boolean;
}

const LoadingContainer: React.FC<Props> = ({ isOpen }) => {
  if (isOpen) {
    return (
      <div className="loading-container">
        <CoffeeLoading size="large" className="loader">
          Loading
        </CoffeeLoading>
        <span className="loader-anim1"></span>
        <span className="loader-anim2"></span>
        <span className="loader-text">COFFEE'S COMING</span>
      </div>
    );
  } else {
    return null;
  }
};

export default LoadingContainer;
