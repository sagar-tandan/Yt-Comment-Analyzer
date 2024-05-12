import React from "react";
import youtube from "../../assets/youtube.png";
import git from "../../assets/git.png";
import git1 from "../../assets/git2.png";

export default function () {
  return (
    <div className="bg-red-600 fixed  top-0 w-full shadow-sm  z-20 p-3">
      <div className="w-full px-4 md:px-14 flex justify-between">
        <div className="flex gap-1 justify-start items-center">
          <img className=" w-6 h-6 md:w-8 md:h-8" src={youtube} alt="" />
          <h1 className="text-white text-sm md:text-lg font-SagarFont font-semibold">
            Comment Analyzer
          </h1>
        </div>

        <a href="https://github.com/sagar-tandan/Yt-Comment-Analyzer" target="_blank">
        <div className="relative w-6 h-6 md:w-8 md:h-8 group hover:cursor-pointer active:scale-95">
          <img
            className="wfull group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
            src={git}
            alt="git"
          />
          <img
            className="absolute top-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            src={git1}
            alt="git"
          />
        </div>
        </a>
      </div>
    </div>
  );
}
