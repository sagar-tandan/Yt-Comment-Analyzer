import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VideoTitle({videoId,apiKey,apiKey1,apiKey2,apiKey3}) {
    const[videoTitle,setVideoTitle] = useState('');
    const [totalComments, setTotalComments] = useState(0);
    const [totalViews, setTotalViews] = useState(0);
    const [channelId, setChannelId] = useState('');
    const [channelTitle, setChannelTitle] = useState('');
    const [Likes, setLikes] = useState(0);
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

      

    useEffect(()=>{
        const fetchTitle= async()=>{
            try {
                const response = await axios.get(
                  `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${api}`
                );
        
                // Extract total comment count from the response
                const totalCommentsCount = parseInt(response.data.items[0].statistics.commentCount);
                const totalViewCount = parseInt(response.data.items[0].statistics.viewCount);
                const title = response.data.items[0].snippet.title;
                const channelID = response.data.items[0].snippet.channelId;
                const channelTitle = response.data.items[0].snippet.channelTitle;
                const likes = response.data.items[0].statistics.likeCount;

                
                // Set the total comments state
                setTotalComments(formatCount(totalCommentsCount));
                setTotalViews((totalViewCount));
                setVideoTitle(title);
                setChannelId(channelID);
                setChannelTitle(channelTitle);
                setLikes((likes))

              } catch (error) {
                console.log(api)
                // console.error("Error fetching total comments:", error);
                setErrorCount(prevCount => Math.min(prevCount + 1, 3));
                if (errorCount === 1) {
                  // First time error occurred, switch to apiKey2
                  setApi(apiKey1);
                  // console.log(api);
                } else if (errorCount === 2) {
                  // Second time error occurred, switch to apiKey3
                  setApi(apiKey2);
                  // console.log(api);
                } else if(errorCount === 3){
                  setApi(apiKey3);
                }
              }

        }

        fetchTitle();
    },[videoId,api,errorCount]);

    return { videoTitle, totalComments, totalViews,channelId,channelTitle,Likes };

}

export default VideoTitle