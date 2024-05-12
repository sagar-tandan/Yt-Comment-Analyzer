import React, { useState, useEffect } from "react";
import VideoInfo from "./Comps/VideoInfo";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import ProjectDetails from "./Comps/ProjectDetails.jsx";
import { toast } from "react-toastify";

export default function Home() {
  const [YtLink, setYtLink] = useState("");
  const [videoId, setVideoId] = useState("");

  const [loading, setLoading] = useState("False"); // Add loading state

  // let API_KEY = "AIzaSyCqSY3vDMPkjVDbhbHheROw2vrzu7e6Q-w"; //w
  let API_KEY = process.env.VITE_APP_API_KEY1; //w
  let API_KEY1 = process.env.VITE_APP_API_KEY2;
  let API_KEY2 = process.env.VITE_APP_API_KEY3; //o
  let API_KEY3 = process.env.VITE_APP_API_KEY4;

  // Function to handle the change event
  const handleYtLinkChange = (e) => {
    const newLink = e.target.value;
    setYtLink(newLink);
  };

  const handelOnSubmit = (e) => {
    if (e) {
      e.preventDefault(); // Prevent default form submission behavior
    }
    setLoading("True");
    try {
      if (YtLink.startsWith("https://www.youtube.com/")) {
        // console.log(YtLink);
        const videoId = YtLink.split("v=")[1];
        // console.log(videoId);
        setVideoId(videoId);
      } else if (YtLink.startsWith("https://youtu.be/")) {
        const videoId1 = YtLink.split("https://youtu.be/").pop().split("?")[0];
        // console.log(videoId1);
        setVideoId(videoId1);
      } else {
        setVideoId("");
        // console.log("Link not supported!");
        toast.error("Link not Supported!! ", {
          position: "top-center",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          autoClose: 4000,
        });
      }

      setLoading("False");
    } catch (error) {
      // console.log(error);
      toast.error("Something Went wrong!! ", {
        position: "top-bottom",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        autoClose: 4000,
      });
    }

    // Add further logic here, such as sending the YtLink to a server
  };

  return (
    <div>
      <div className="mx-4 relative top-20">
        <div className="container relative flex flex-col justify-center items-center max-w-screen-md md:mx-auto ">
          <h1 className="font-SagarFont font-bold text-sm sm:text-xl md:text-3xl">
            Youtube Video Analytics and Reports
          </h1>
          <div className="flex border-[2px]  border-black w-full rounded-full mt-3 mb-2 ">
            <input
              className="mx-3 my-2 sm:p-2 p-[2px] w-full outline-none font-SagarFont"
              type="text"
              name="YtLink"
              onChange={handleYtLinkChange} // Call handleYtLinkChange function on change
              placeholder="Enter Youtube video URL here"
            />
          </div>

          <div
            onClick={handelOnSubmit}
            className="w-full bg-red-600 p-2 sm:p-3 flex justify-center items-center rounded-full hover:cursor-pointer text-white mb-2 hover:bg-white hover:text-black transition-all ease-in-out duration-500 border-red-500 border-[2px] md:absolute md:bottom-[4px] md:right-0 md:w-[20%] md:mr-1 active:scale-90"
          >
            <h2 className="font-SagarFont font-semibold text-md">Search</h2>
          </div>
        </div>

        {/* START of Video Contents */}
        <div>
          {loading === "True" && (
            <div className="flex justify-center items-center mt-10">
              <ClipLoader
                color="red"
                loading="true"
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
          {videoId && loading == "False" && (
            <VideoInfo
              videoId={videoId}
              apiKey={API_KEY}
              apiKey1={API_KEY1}
              apiKey2={API_KEY2}
              apiKey3={API_KEY3}
            />
          )}
        </div>

        <ProjectDetails />
      </div>
    </div>
  );
}
