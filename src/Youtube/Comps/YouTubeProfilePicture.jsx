import React, { useEffect, useState } from "react";
import axios from "axios";

const YouTubeProfilePicture = ({
  channelId,
  apiKey,
  apiKey1,
  apiKey2,
  apiKey3,
}) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [subscriberCount, setSubCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [views, setViews] = useState(0);
  const [date, setDate] = useState("");
  const [channelSubO, SetSub] = useState("");
  const [api, setApi] = useState(apiKey);
  const [errorCount, setErrorCount] = useState(0);

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

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${api}`
        );
        const profilePictureUrl =
          response.data.items[0].snippet.thumbnails.default.url;
        const sunCount = response.data.items[0].statistics.subscriberCount;
        const videoCount = response.data.items[0].statistics.videoCount;
        const viewTotal = response.data.items[0].statistics.viewCount;
        const madeOn = response.data.items[0].snippet.publishedAt.split("T")[0];

        setProfilePictureUrl(profilePictureUrl);
        setSubCount(formatCount(sunCount));
        setVideoCount(formatCount(videoCount));
        setViews(formatCount(viewTotal));
        setViews(formatCount(viewTotal));
        setDate(madeOn);
        SetSub(sunCount);
      } catch (error) {
        console.log(api);
        // console.error("Error fetching total comments:", error);
        setErrorCount((prevCount) => Math.min(prevCount + 1, 3));
        if (errorCount === 1) {
          // First time error occurred, switch to apiKey2
          setApi(apiKey1);
          // console.log(api);
        } else if (errorCount === 2) {
          // Second time error occurred, switch to apiKey3
          setApi(apiKey2);
          // console.log(api);
        } else if (errorCount === 3) {
          setApi(apiKey3);
        }
      }
    };

    fetchProfilePicture();
  }, [channelId, api,errorCount]);

  return {
    profilePictureUrl,
    subscriberCount,
    videoCount,
    views,
    date,
    channelSubO,
  };
};

export default YouTubeProfilePicture;
