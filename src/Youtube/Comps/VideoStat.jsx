import React, { useState } from "react";
import pos from "../../assets/pos.png";
import neg from "../../assets/neg.png";
import neu from "../../assets/neutral.png";
import ClipLoader from "react-spinners/ClipLoader";

const VideoStat = ({
  commentsCount,
  likesCount,
  videoViews,
  videoId,
  apiKey,
  channelSub,
  joyComments,
  neutralComments,
  angryComments,
}) => {
  const [senti, setSenti] = useState("Positive");

  const formatCount = (count) => {
    if (count < 1000) {
      return count.toString();
    } else if (count < 1000000) {
      return (count / 1000).toFixed(1) + "K";
    } else if (count < 1000000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else {
      return (count / 1000000000).toFixed(1) + "B";
    }
  };

  const likesRatio = (
    (parseInt(likesCount) / parseInt(videoViews)) *
    100
  ).toFixed(2);
  const viewsRatio = (
    (parseInt(videoViews) / parseInt(channelSub)) *
    100
  ).toFixed(2);

  // const commentSenti = (
  //   (parseInt(joyComments) /
  //     (parseInt(joyComments) +
  //       parseInt(neutralComments) +
  //       parseInt(angryComments))) *
  //   100
  // ).toFixed(2);

  // const commentSenti1 = (
  //   (parseInt(neutralComments) /
  //     (parseInt(joyComments) +
  //       parseInt(neutralComments) +
  //       parseInt(angryComments))) *
  //   100
  // ).toFixed(2);

  // const commentSenti2 = (
  //   (parseInt(angryComments) /
  //     (parseInt(joyComments) +
  //       parseInt(neutralComments) +
  //       parseInt(angryComments))) *
  //   100
  // ).toFixed(2);

  return (
    <div className="flex flex-col my-3 px-2 gap-10 w-full">
      {/* stats */}
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-10 md:gap-0 md:justify-between mx-2 font-SagarFont text-lg">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#565656]">Video Views</h1>
          <span className="font-semibold text-2xl md:text-lg">
            {formatCount(videoViews)} Views
          </span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#565656]">Video Likes</h1>
          <span className="font-semibold text-2xl md:text-lg">
            {formatCount(likesCount)} Likes
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#565656]">Comments</h1>
          <span className="font-semibold text-2xl md:text-lg">
            {commentsCount} Comments
          </span>
        </div>
      </div>

      {/* Analytics */}

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-0 md:justify-between mx-2 font-SagarFont text-lg">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#565656]">Views Ratio</h1>
          <span className="font-semibold text-2xl md:text-lg">
            {viewsRatio}%
          </span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#565656]">Likes Ratio</h1>
          <span className="font-semibold text-2xl md:text-lg">
            {likesRatio}%
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#565656]">Comment Emotion</h1>
          {joyComments > neutralComments && joyComments > angryComments && (
            <div className="flex gap-1 justify-center items-center">
              <span className="font-semibold text-2xl md:text-lg">
              </span>
              <div
                className={`flex border-[2px] border-green-600 p-1 px-3 rounded-full w-full gap-1 justify-center items-center`}
              >
                <img className="w-5 h-5" src={pos} alt="" />

                <h2
                  className={`font-SagarFont font-semibold
                  text-green-600`}
                >
                  Positive
                </h2>
              </div>
            </div>
          )}

          {neutralComments >joyComments && neutralComments > angryComments  && (
            <div className="flex gap-1 justify-center items-center">
              <span className="font-semibold text-2xl md:text-lg">
              </span>
              <div
                className={`flex border-[2px] border-gray-600 p-1 px-3 rounded-full w-full gap-1 justify-center items-center`}
              >
                <img className="w-5 h-5" src={neu} alt="" />

                <h2
                  className={`font-SagarFont font-semibold
                  text-gray-600`}
                >
                  Neutral
                </h2>
              </div>
            </div>
          )}

          {angryComments > joyComments && angryComments > neutralComments && (
            <div className="flex gap-1 justify-center items-center">
              <span className="font-semibold text-2xl md:text-lg">
              </span>
              <div
                className={`flex border-[2px] border-red-600 p-1 px-3 rounded-full w-full gap-1 justify-center items-center`}
              >
                <img className="w-5 h-5" src={neg} alt="" />

                <h2
                  className={`font-SagarFont font-semibold
                  text-red-600`}
                >
                  Negative
                </h2>
              </div>
            </div>
          )}
          {joyComments == "0" && neutralComments == "0" && angryComments == "0" && (
            <div className="mt-3">
              <ClipLoader
                color="red"
                loading="true"
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoStat;
