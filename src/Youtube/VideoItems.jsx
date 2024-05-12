// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import YouTubeProfilePicture from "./Comps/YouTubeProfilePicture.jsx";
// import VideoCard from "./Components/VideoCard.jsx";

// export const VideoItems = () => {


//   const [videos, setVideos] = useState([]);
//   const [nextPageToken, setNextPageToken] = useState("");

//   useEffect(() => {
//     fetchVideos();
//   }, []);


//   const fetchVideos = async () => {
//     try {
//       const response = await axios.get(
//         `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=48&key=${API_KEY}`
//       );

//       const initialVideos = response.data.items;
//       const initialNextPageToken = response.data.nextPageToken || "";

//       setVideos(initialVideos);
//       // setNextPageTokens(initialNextPageToken);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   return (
//     <div className="mx-4">
//       <div className="container flex flex-col sm:flex-row flex-wrap sm:mx-auto max-w-screen-2xl">
//         {videos.map((video, index) => (
//           <div key={index} className=" w-full sm:w-[48%] lg:w-[32%] mx-auto">
//             <VideoCard
//               videoId= {video.id}
//               title={video.snippet.title}
//               thumbnail={video.snippet.thumbnails.standard.url}
//               channelId={video.snippet.channelId}
//               channelName={video.snippet.channelTitle}
//               date={video.snippet.publishedAt.split("T")[0]}
//               apiKey={API_KEY}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
