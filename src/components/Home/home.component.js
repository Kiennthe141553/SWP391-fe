import React from "react";
import "../../styles/tailwind.css";
import "../../styles/home.css";
import { Footer } from "antd/lib/layout/layout";
import { SubTitle } from "chart.js";
import { Link } from "react-router-dom";

export default function Home() {
  const styles = {
    btn: "bg-green-500 text-white shadow-lg rounded-md p-2 shadow-indigo-500/40 btn",
  };
  return (
    <div className="home-container flex items-center flex-col">
      <div className="pb-8">
        {/* banner */}
        <div className="flex justify-center p-4">
          <img
            alt="img"
            className="w-7/12"
            src={require("../../imgs/home_img_2.png")}
          />
        </div>
        {/* text */}
        <div>
          <h1 className="text-center font-extrabold text-4xl text-gray-600">
            Learn about English with fun, efficient way with no cost
          </h1>
          <div className="flex justify-center items-center flex-col w-full">
            <Link to={"/register"} className="nav-link">
              <button className={styles.btn}>Get started</button>
            </Link>
            <Link to={"/login"} className="nav-link">
              <button className=" text-gray-800 border-2 border-black p-2 mt-4 shadow-sm rounded-xl btn">
                I already have an account
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* bottom */}
      <div className="border-t-4 w-8/12 flex flex-col justify-center">
        <p className="text-center pb-2 font-extrabold text-4xl text-gray-600 pt-10">
          A little thing this app can help you
        </p>
        <div className="flex items-center justify-between p-10 border-t-4 border-gray-400">
          <div className="w-6/12">
            {/* text */}
            <div className="font-medium text-gray-600 text-2xl mb-8">
              Flash cards allow students to interact with information in a way
              that makes it easier to retain. Flash cards are strategically
              designed to enhance and encourage active recall.
            </div>
            <Link to={"/register"} className="nav-link">
              <button className={styles.btn}>Get started</button>
            </Link>
          </div>
          {/* image */}
          <div className="w-4/12">
            <img alt="img" className="" src={require("../../imgs/fnc1.avif")} />
          </div>
        </div>

        <div className="flex items-center justify-between p-10 border-t-4 border-gray-400">
          {/* image */}
          <div className="w-4/12">
            <img
              alt="img"
              className=""
              src={require("../../imgs/home_img_4.webp")}
            />
          </div>
          <div className="w-6/12">
            {/* text */}
            <div className="font-medium text-gray-600 text-2xl mb-8">
              Quick practice help you prepare for exams and remember better
            </div>
            <Link to={"/register"} className="nav-link">
              <button className={styles.btn}>Get started</button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between p-10 border-t-4 border-gray-400">
          <div className="w-6/12">
            {/* text */}
            <div className="font-medium text-gray-600 text-2xl mb-8">
              Demo simulation test help user have real experience like take real
              test
            </div>
            <Link to={"/register"} className="nav-link">
              <button className={styles.btn}>Get started</button>
            </Link>
          </div>
          {/* image */}
          <div className="w-4/12">
            <img
              alt="img"
              className=""
              src={require("../../imgs/home_img_3.webp")}
            />
          </div>
        </div>
      </div>
      <Footer className="w-full footer flex justify-between items-center font-mono">
        <div className="flex w-4/12">
          <div className="text-bold text-3xl pr-2 border-r-2 border-gray-200">
            Grp3
          </div>
          <div className="ml-2">
            Quiz App Project
            <br />
            2022 GR3:All right reserved
          </div>
        </div>
        <div className="flex items-center justify-between w-1/12">
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-facebook"
              viewBox="0 0 16 16"
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
            </svg>
          </i>
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-twitter"
              viewBox="0 0 16 16"
            >
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
          </i>
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-telegram"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
            </svg>
          </i>
        </div>
      </Footer>
    </div>
  );
}
