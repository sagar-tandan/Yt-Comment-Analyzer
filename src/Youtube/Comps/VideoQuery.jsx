import React, { useEffect, useState } from "react";
import topTenVideos from "../../assets/data/ToptenVideos.jsx";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const VideoQuery = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setVideos(topTenVideos);
    // Simulate loading for 1 seconds
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const copyLink = (link) => {
    const linkURL = link; // You can change this to the URL you want to copy
    navigator.clipboard
      .writeText(linkURL)
      .then(() => {
        toast.success("Link Copied to Clipboard! ", {
          position: "top-right",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          autoClose: 4000,
        });
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader
            color="red"
            loading="true"
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <ul>
          {/* Map through the videos and display them */}
          {videos.map((video, index) => (
            <li
              onClick={() => {
                copyLink(video.YtLink); // Passing the video's YouTube link to the copyLink function
              }}
              key={index}
              className="mb-6 group hover:cursor-pointer active:scale-90 transition-all ease-in-out duration-500"
            >
              <div className="w-full h-[220px] sm:h-[300px] md:h-[150px] overflow-hidden rounded-lg ">
                <img
                  className="w-full h-[220px] sm:h-[300px] md:h-[150px] scale-[100%] group-hover:scale-[120%] transition-all ease-in-out duration-500 "
                  src={video.thumbnail}
                  alt={video.title}
                />
              </div>
              <h2 className="font-SagarFont font-semibold text-md my-1">
                {video.title}
              </h2>
              <h2 className="font-SagarFont font-light text-sm my-1 text-[#565656]">
                {video.views} Views
              </h2>
              <h2 className="font-SagarFont font-light text-sm my-1 text-[#565656]">
                {video.publishDate}
              </h2>
              <div className="border"></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VideoQuery;
