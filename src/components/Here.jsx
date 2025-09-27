import React from "react";
import heroImg from "../images/hero.gif";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div
        className="hero flex flex-col lg:flex-row items-center justify-between px-3 xs:px-4 sm:px-6 md:px-8 lg:px-[100px] py-6 sm:py-8 lg:py-0"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="left w-full lg:w-[50%] mb-6 sm:mb-8 lg:mb-0 text-center lg:text-left">
          <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[60px] leading-tight">
            Unlock the Secrets to <span className="sp-text">Masterful</span>{" "}
            Programming Here.
          </h3>
          <div className="flex flex-col sm:flex-row mt-4 sm:mt-6 items-center gap-3 sm:gap-[15px] justify-center lg:justify-start">
            <Link
              to="/blogs"
              className="btnNormal flex items-center justify-center w-full sm:w-auto px-4 xs:px-6 py-2 xs:py-3 text-sm xs:text-base"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="btnWhite flex items-center justify-center w-full sm:w-auto px-4 xs:px-6 py-2 xs:py-3 text-sm xs:text-base mt-2 sm:mt-0"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="right w-full lg:w-[50%] flex justify-center mt-6 sm:mt-8 lg:mt-0">
          <img
            className="rounded-[20px] w-full max-w-xs sm:max-w-md lg:max-w-full"
            src={heroImg}
            alt="Hero illustration"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
