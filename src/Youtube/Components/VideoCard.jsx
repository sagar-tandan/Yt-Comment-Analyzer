// import React, { useEffect, useState } from "react";
// import YouTubeProfilePicture from "../Comps/YouTubeProfilePicture.jsx";
// // import TotalCommentsCount from "./TotalCommentsCount.jsx";
// import TotalViewsCount from './TotalViewsCount.jsx'

// export default function VideoCard({
//   videoId,
//   title,
//   thumbnail,
//   channelId,
//   channelName,
//   date,
//   apiKey,
// }) {
//   const stitle = title.length > 75 ? title.substr(0, 75) + "..." : title;
//   {
//     /* <TotalCommentsCount 
//                   videoId={videoId}
//                   apiKey={apiKey}/>  */
//   }


//   return (
//     <div>
//       <div className="container w-full mb-2 ">
//         {/* THUMBNAIL */}
//         <div className="w-full overflow-hidden h-[250px] sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[250px] flex justify-center items-center rounded-xl mt-2 ">
//           <img
//             className="w-full scale-125 hover:brightness-50 transition-all ease-in-out duration-500 hover:cursor-pointer active:brightness-0 active:scale-95"
//             src={thumbnail}
//             alt=""
//           />
//         </div>

//         <div className="flex justify-start items-start gap-3">
//           {/* channelLogo */}
//           <YouTubeProfilePicture channelId={channelId} apiKey={apiKey} />
//           <div>
//             <h2 className="mt-2 font-SagarFont font-semibold">{stitle}</h2>
//             <h3 className="font-SagarFont font-sm text-[#434141]">
//               {channelName}
//             </h3>
//             <div className="flex gap-1 justify-start items-center font-SagarFont font-sm text-[#434141]">
//               <h3><TotalViewsCount
//               videoId={videoId}
//               apiKey={apiKey}/> views</h3>
//               <div className="border-[1px] border-solid w-[4px] h-[4px] rounded-full bg-[#434141]"></div>
//               <h3><TotalCommentsCount
//               videoId={videoId}
//               apiKey={apiKey} />Comments</h3>
//               <div>
//     </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }
