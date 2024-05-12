import React, { useState, useEffect } from "react";
import VideoTitle from "./VideoTitle.jsx";
import YouTubeProfilePicture from "./YouTubeProfilePicture.jsx";
import VideoQuery from "./VideoQuery.jsx";
import VideoStat from "./VideoStat.jsx";
import exit from "../../assets/exit.png";
import axios from "axios";
import pos from "../../assets/pos.png";
import angry from "../../assets/angry.png";
import confusion from "../../assets/confusion.png";
import neutral from "../../assets/neutral.png";
import sad from "../../assets/sad.png";
import ClipLoader from "react-spinners/ClipLoader";
import ProjectDetails from "./ProjectDetails.jsx";
import noComment from "../../assets/noComments.png";

const VideoInfo = ({ videoId, apiKey, apiKey1, apiKey2, apiKey3 }) => {
  const [upLoad, setUpLoad] = useState("True");
  const [comments, setComments] = useState([]);
  const [joyComments, setJoyComments] = useState([]);
  const [angryComments, setAngryComments] = useState([]);
  const [SadComments, setSadComments] = useState([]);
  const [NeutralComments, setNeutralComments] = useState([]);
  const [inquiryComments, setInquiryComments] = useState([]);

  const [authorName, setAN] = useState([]);
  const [authorImage, setAI] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [commentCount, setCommentCounts] = useState(0);
  const [Emotions, setEmotions] = useState([]);
  const [loading, setLoading] = useState("False");
  const [progresss, setProgresss] = useState(0);

  //for Comment classification button clicked
  const [classify, setClassify] = useState("");
  const [api, setApi] = useState(apiKey);
  const [errorCount, setErrorCount] = useState(0);

  const {
    videoTitle,
    totalComments,
    totalViews,
    channelId,
    channelTitle,
    Likes,
  } = VideoTitle({ videoId, apiKey, apiKey1, apiKey2, apiKey3 });

  const {
    profilePictureUrl,
    subscriberCount,
    videoCount,
    views,
    date,
    channelSubO,
  } = YouTubeProfilePicture({ channelId, apiKey, apiKey1, apiKey2, apiKey3 });

  //

  //Fetching Comments from videoid

  useEffect(() => {
    const fetchComments = async () => {
      try {
        let allComments = [];
        let allAuthName = [];
        let allAuthImage = [];
        let nextPageToken = null;
        let fetchedCount = 0;

        do {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=100${
              nextPageToken ? `&pageToken=${nextPageToken}` : ""
            }&key=${api}`
          );

          if (response.data.error) {
            throw new Error(
              `YouTube API Error: ${response.data.error.code} - ${response.data.error.message}`
            );
          }

          const newComments = response.data.items.map(
            (item) => item.snippet.topLevelComment.snippet.textDisplay
          );

          const newName = response.data.items.map(
            (item) => item.snippet.topLevelComment.snippet.authorDisplayName
          );

          const newProfileA = response.data.items.map(
            (item) => item.snippet.topLevelComment.snippet.authorProfileImageUrl
          );

          allComments = allComments.concat(newComments);
          allAuthName = allAuthName.concat(newName);
          allAuthImage = allAuthImage.concat(newProfileA);

          fetchedCount += newComments.length;
          const progress = Math.min(
            Math.ceil((fetchedCount / commentCount) * 100),
            100
          );
          setProgresss(progress);
          nextPageToken = response.data.nextPageToken;
        } while (
          allComments.length < commentCount &&
          nextPageToken != undefined &&
          allComments.length < totalComments
        );

        // setComments(allComments.slice(0, commentCount)); // Ensure only required number of comments are set
        setComments(allComments);
        setAN(allAuthName);
        setAI(allAuthImage);
        setProgresss(100);
        // console.log(comments)
      } catch (error) {
        console.log(api);
        // console.error("Error fetching  comments:", error);
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

    if (commentCount >= 100) {
      fetchComments();
    }
  }, [videoId, apiKey, commentCount, errorCount]);

  useEffect(() => {
    console.log(comments); // Log comments whenever it changes
    const API_CALL = async () => {
      try {
        setLoading("True");
        const response = await fetch(
          import.meta.env.VITE_APP_MODEL,
          // "http://127.0.0.1:8000/sentiment-analysis/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ texts: comments }),
          }
        );
        setLoading("False");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
          setLoading("False");
        }

        const data = await response.json();
        setEmotions(data);
        setLoading("False");
      } catch (error) {
        console.error("Error:", error);
        setLoading("False");
      }
    };

    API_CALL();
  }, [comments]);

  useEffect(() => {
    // console.log(Emotions);
    const joyComments = Emotions.filter(
      (comment) => comment.sentiment === "Joy"
    );
    const sadComments = Emotions.filter(
      (comment) => comment.sentiment === "Sadness"
    );
    const angryComments = Emotions.filter(
      (comment) => comment.sentiment === "Disappointment"
    );
    const neutralComments = Emotions.filter(
      (comment) => comment.sentiment === "Neutral"
    );
    const inquiryComments = Emotions.filter(
      (comment) => comment.sentiment === "Inquiry"
    );

    setJoyComments(joyComments);
    setSadComments(sadComments);
    setNeutralComments(neutralComments);
    setInquiryComments(inquiryComments);
    setAngryComments(angryComments);
    // console.log(joyComments);
  }, [Emotions]);

  const handleClick = () => {
    setShowDialog(true);
  };

  const handleClickClose = () => {
    setShowDialog(false);
  };

  const handleCommentCount = async (count) => {
    setClassify("All");
    setShowDialog(false);
    setCommentCounts(count);

  };

  return (
    <div>
      <div className="mx-4 my-24 max-w-screen-lg sm:mx-auto ">
        <div className="flex gap-5 md:flex-row flex-col ">
          <div className="w-[100%] md:w-[75%] flex flex-col items-center ">
            <iframe
              className="w-full aspect-video rounded-xl "
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
              frameborder="0"
              allowfullscreen
            ></iframe>
            <h2 className="font-SagarFont mt-2 font-semibold text-xl mx-1">
              {videoTitle}
            </h2>
            <div className="flex flex-col justify-start items-start w-full">
              <div className="flex gap-2 justify-start items-center mt-2">
                {/* //channel Thumbnail */}
                <img
                  className="w-8 h-8 rounded-full ml-2"
                  src={profilePictureUrl}
                  alt="Channel Profile Picture"
                />

                <h2 className="font-SagarFont font-semibold text-md">
                  {channelTitle}
                </h2>
              </div>

              {/* channel other Infos */}
              <div className="md:flex-row flex md:justify-start items-start md:items-center mt-3 md:gap-2 flex-col gap-0">
                <h3 className="font-SagarFont ml-2  text-[#565656]">
                  {subscriberCount} Subscribers
                </h3>
                <h3 className="font-SagarFont ml-2 text-[#565656]">
                  {videoCount} Videos
                </h3>
                <h3 className="font-SagarFont ml-2 text-[#565656]">
                  {views} Total videos views
                </h3>
              </div>

              <h3 className="font-SagarFont ml-2 text-[#565656]">
                Data updated on {date}{" "}
              </h3>
            </div>

            {/* for border */}
            <div className="border-[1px] w-full mt-4 border-[#b9b9b9]"></div>

            {/* Like comments Sections */}
            <div className="my-10 justify-start items-start w-full">
              <VideoStat
                commentsCount={totalComments}
                likesCount={Likes}
                videoViews={totalViews}
                videoId={videoId}
                apikey={apiKey}
                channelSub={channelSubO}
                joyComments ={joyComments.length}
                angryComments={angryComments.length}
              />
            </div>

            <div className="border-[1px] w-full mt-4 border-[#b9b9b9]"></div>

            {/* Comments Sections */}
            {progresss <= 0 && (
              <div className="flex flex-col w-full my-10">
                {/* <h1 className="font-SagarFont font-semibold text-xl sm:text-lg">Comments</h1> */}
                <div className="w-full flex justify-center items-center mt-6">
                  <div
                    className="sm:w-[50%] w-[80%] bg-red-600 flex justify-center items-center py-2 rounded-full hover:cursor-pointer border-[2px] border-red-600 hover:bg-white transition-all ease-in-out duration-500 hover:text-black text-white active:scale-95"
                    onClick={handleClick}
                  >
                    <h1 className="font-SagarFont font-medium md:font-semibold text-sm md:text-lg ">
                      Analyze Comments
                    </h1>
                  </div>
                </div>
              </div>
            )}

            {progresss > 0 && progresss < 100 && (
              <div className="flex flex-col w-full">
                {/* <h1 className="font-SagarFont font-semibold text-xl sm:text-lg">Comments</h1> */}
                <div className="w-full flex justify-center items-center mt-6">
                  <div className="sm:w-[50%] w-[100%] bg-red-600 flex justify-center items-center py-2 px-3 rounded-full hover:cursor-pointer border-[2px] border-red-600 hover:bg-white transition-all ease-in-out duration-500 hover:text-black text-white active:scale-95">
                    <svg
                      className="w-6 h-6 animate-spin mr-1"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="#ede8e0"
                      stroke-width="4"
                    >
                      <circle cx="50" cy="50" r="40" stroke-opacity="0.5" />
                      <path
                        d="M50 10
        a 40 40 0 0 1 0 80
        a 40 40 0 0 1 0 -80"
                        stroke-linecap="round"
                        stroke-dasharray="0 150"
                      >
                        <animate
                          attributeName="stroke-dasharray"
                          dur="1.5s"
                          repeatCount="indefinite"
                          values="0 150; 150 0; 0 150"
                        />
                      </path>
                    </svg>

                    <h1 className="font-SagarFont font-medium md:font-semibold text-sm md:text-lg">
                      Loading Comments
                    </h1>
                  </div>
                </div>
              </div>
            )}

            {progresss == 100 && (
              <div>
                {loading == "True" && (
                  <div className="flex flex-col w-full">
                    {/* <h1 className="font-SagarFont font-semibold text-xl sm:text-lg">Comments</h1> */}
                    <div className="w-full flex justify-center items-center mt-6">
                      <div className="md:w-[100%] w-[100%] bg-red-600 flex justify-center items-center py-2 px-3 rounded-full  border-[2px] border-red-600  text-white ">
                        {/* <div className="relative border-[3px] p-2 rounded-full w-7 h-7 mr-3">
                          <div class=" absolute w-7 h-7 border-t-[3px] border-red-500 border-solid rounded-full animate-spin mr-3 -top-[2px] -left-[3px]"></div>
                        </div> */}
                        <svg
                          className="w-6 h-6 animate-spin mr-1"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="#ede8e0"
                          stroke-width="4"
                        >
                          <circle cx="50" cy="50" r="40" stroke-opacity="0.5" />
                          <path
                            d="M50 10
        a 40 40 0 0 1 0 80
        a 40 40 0 0 1 0 -80"
                            stroke-linecap="round"
                            stroke-dasharray="0 150"
                          >
                            <animate
                              attributeName="stroke-dasharray"
                              dur="1.5s"
                              repeatCount="indefinite"
                              values="0 150; 150 0; 0 150"
                            />
                          </path>
                        </svg>

                        <h1 className="font-SagarFont font-medium md:font-semibold text-sm md:text-lg">
                          Analyzing Comments
                        </h1>
                      </div>
                    </div>
                  </div>
                )}
                {loading == "False" && (
                  <div className="w-full">
                    <div className="flex flex-col mt-4 w-full">
                      <h1 className="font-SagarFont text-xl font-bold w-full ">
                        Comments
                      </h1>
                      <div className="flex flex-col gap-1 justify-center items-center mt-2 lg:gap-6 md:gap-3 mx-3 sm:flex-row">
                        <div className="flex w-full gap-2 md:gap-1 lg:gap-4">
                          <div
                            onClick={() => {
                              setClassify("All");
                            }}
                            className={` text-white px-3 lg:px-5 py-1 sm:py-2 w-full font-SagarFont font-semibold text-sm rounded-md flex justify-center gap-2 lg:gap-2 hover:bg-red-700 active:scale-90 transition-all ease-in-out duration-300 hover:cursor-pointer ${
                              classify == "All" ? "bg-red-600" : "bg-zinc-500"
                            }`}
                          >
                            All
                          </div>
                          <div
                            onClick={() => setClassify("Joy")}
                            className={` text-white  px-3 lg:px-5 py-1 sm:py-2 w-full font-SagarFont font-semibold text-sm rounded-md flex justify-center gap-2 lg:gap-2 hover:bg-red-700 active:scale-90 transition-all ease-in-out duration-300 hover:cursor-pointer ${
                              classify == "Joy" ? "bg-red-600" : "bg-zinc-500"
                            }`}
                          >
                            <h1>Joy</h1>
                            <h1>({joyComments.length})</h1>
                          </div>
                          <div
                            onClick={() => setClassify("Neutral")}
                            className={` text-white  px-3 lg:px-5 py-1 sm:py-2 w-full font-SagarFont font-semibold text-sm rounded-md flex justify-center gap-2 lg:gap-2 hover:bg-red-700 active:scale-90 transition-all ease-in-out duration-300 hover:cursor-pointer ${
                              classify == "Neutral"
                                ? "bg-red-600"
                                : "bg-zinc-500"
                            }`}
                          >
                            <h1>Neutral</h1>
                            <h1>({NeutralComments.length})</h1>{" "}
                          </div>
                        </div>

                        <div className="flex w-full gap-2  md:gap-1 lg:gap-4">
                          <div
                            onClick={() => setClassify("Sad")}
                            className={` text-white  px-3 lg:px-5 py-1 sm:py-2 w-full font-SagarFont font-semibold text-sm rounded-md flex justify-center gap-2 lg:gap-2 hover:bg-red-700 active:scale-90 transition-all ease-in-out duration-300 hover:cursor-pointer ${
                              classify == "Sad" ? "bg-red-600" : "bg-zinc-500"
                            }`}
                          >
                            <h1>Sad</h1>
                            <h1>({SadComments.length})</h1>
                          </div>

                          <div
                            onClick={() => setClassify("Inquiry")}
                            className={` text-white px-3 lg:px-5 py-1 sm:py-2 w-full font-SagarFont font-semibold text-sm rounded-md flex justify-center gap-2 lg:gap-2 hover:bg-red-700 active:scale-90 transition-all ease-in-out duration-300 hover:cursor-pointer ${
                              classify == "Inquiry"
                                ? "bg-red-600"
                                : "bg-zinc-500"
                            }`}
                          >
                            <h1>Inquiry</h1>
                            <h1>({inquiryComments.length})</h1>
                          </div>
                          <div
                            onClick={() => setClassify("Dissapointed")}
                            className={` text-white px-3 lg:px-5 py-1 sm:py-2 w-full font-SagarFont font-semibold text-sm rounded-md flex justify-center gap-4 lg:gap-2 hover:bg-red-700 active:scale-90 transition-all ease-in-out duration-300 hover:cursor-pointer ${
                              classify == "Dissapointed"
                                ? "bg-red-600"
                                : "bg-zinc-500"
                            }`}
                          >
                            <h1>Angry</h1>
                            <h1>({angryComments.length})</h1>
                          </div>
                        </div>
                      </div>
                      {/* Now the comments Begins */}
                      <div></div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {loading == "False" && classify == "All" && (
              <div>
                {Emotions.length > 0 ? (
                  <div>
                    {Emotions.map((Emotions, index) => (
                      <div key={index}>
                        {
                          <div className="container flex gap-3 items-center my-2 w-full mx-auto ">
                            <div className="flex gap-2 mt-4 w-full ">
                              <img
                                className="w-8 h-8 rounded-full"
                                src={authorImage[index]}
                                alt=""
                              />

                              <div className="flex flex-col gap-1 w-full overflow-clip">
                                <h1 className="font-SagarFont font-medium text-sm text-[#565656]">
                                  {authorName[index]}
                                </h1>
                                <p className="font-SagarFont text-sm text-wrap pr-1">
                                  {Emotions.text}
                                </p>
                              </div>
                            </div>

                            <div className="w-[45%] sm:w-[25%] mt-3">
                              <div
                                className={`flex border-[2px] ${
                                  Emotions.sentiment == "Joy"
                                    ? "border-green-600 text-green-500"
                                    : Emotions.sentiment == "Disappointment"
                                    ? "border-red-500 text-red-500"
                                    : Emotions.sentiment == "Sadness"
                                    ? "border-blue-500 text-blue-500"
                                    : Emotions.sentiment == "Neutral"
                                    ? "border-gray-500 text-gray-500 "
                                    : Emotions.sentiment == "Inquiry"
                                    ? "border-orange-500 text-orange-500"
                                    : ""
                                }  py-2 px-2 sm:px-5 rounded-full w-full gap-1 justify-start items-center`}
                              >
                                <img
                                  className="w-5 h-5"
                                  src={
                                    Emotions.sentiment == "Joy"
                                      ? pos
                                      : Emotions.sentiment == "Disappointment"
                                      ? angry
                                      : Emotions.sentiment == "Sadness"
                                      ? sad
                                      : Emotions.sentiment == "Neutral"
                                      ? neutral
                                      : Emotions.sentiment == "Inquiry"
                                      ? confusion
                                      : ""
                                  }
                                  alt=""
                                />
                                <h1 className="font-SagarFont font-semibold text-sm">
                                  {Emotions.sentiment == "Joy"
                                    ? "Joy"
                                    : Emotions.sentiment == "Disappointment"
                                    ? "Angry"
                                    : Emotions.sentiment == "Sadness"
                                    ? "Sad"
                                    : Emotions.sentiment == "Neutral"
                                    ? "Neutral"
                                    : Emotions.sentiment == "Inquiry"
                                    ? "Inquiry"
                                    : ""}
                                </h1>
                              </div>
                            </div>
                          </div>
                        }
                        <div className="border"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div className="w-full flex gap-2 my-10">
                      <img className="w-7 h-7" src={noComment} alt="" />
                      <h1 className="font-SagarFont text-xl font-semibold text-red-500">
                        No Comments Found!!
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            )}

            {loading == "False" && classify == "Joy" && (
              <div>
                {joyComments.length > 0 ? (
                  <div>
                    {joyComments.map((Emotions, index) => (
                      <div key={index}>
                        {
                          <div className="container flex gap-3 items-center my-2 w-full mx-auto ">
                            <div className="flex gap-2 mt-4 w-full ">
                              <img
                                className="w-7 h-7 rounded-full"
                                src={pos}
                                alt="joy"
                              />

                              <div className="flex flex-col gap-1 w-full overflow-clip">
                                <h1 className="font-SagarFont font-medium text-sm text-[#565656]"></h1>
                                <p className="font-SagarFont text-sm text-wrap pr-1">
                                  {Emotions.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        }
                        <div className="border"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div className="w-full flex gap-2 my-10">
                      <img className="w-7 h-7" src={pos} alt="" />
                      <h1 className="font-SagarFont text-xl font-semibold text-[#1ca44c]">
                        No Joy Comments Found!!
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            )}

            {loading == "False" && classify == "Sad" && (
              <div>
                {SadComments.length > 0 ? (
                  <div>
                    {SadComments.map((Emotions, index) => (
                      <div key={index}>
                        {
                          <div className="container flex gap-3 items-center my-2 w-full mx-auto ">
                            <div className="flex gap-2 mt-4 w-full ">
                              <img
                                className="w-7 h-7 rounded-full"
                                src={sad}
                                alt="sad"
                              />

                              <div className="flex flex-col gap-1 w-full overflow-clip">
                                <h1 className="font-SagarFont font-medium text-sm text-[#565656]"></h1>
                                <p className="font-SagarFont text-sm text-wrap pr-1">
                                  {Emotions.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        }
                        <div className="border"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div className="w-full flex gap-2 my-10">
                      <img className="w-7 h-7" src={sad} alt="" />
                      <h1 className="font-SagarFont text-xl font-semibold text-[#3b82f6]">
                        No Sad Comments Found!!
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            )}

            {loading == "False" && classify == "Neutral" && (
              <div>
                {NeutralComments.length > 0 ? (
                  <div>
                    {NeutralComments.map((Emotions, index) => (
                      <div key={index}>
                        {
                          <div className="container flex gap-3 items-center justify-start my-2 w-full mx-auto ">
                            <div className="flex gap-2 mt-4 w-full ">
                              <img
                                className="w-7 h-7 rounded-full"
                                src={neutral}
                                alt="neutral"
                              />

                              <div className="flex flex-col gap-1 w-full overflow-clip">
                                <h1 className="font-SagarFont font-medium text-sm text-[#565656]"></h1>
                                <p className="font-SagarFont text-sm text-wrap pr-1">
                                  {Emotions.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        }
                        <div className="border"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div className="w-full flex gap-2 my-10">
                      <img className="w-7 h-7" src={neutral} alt="" />
                      <h1 className="font-SagarFont text-xl font-semibold text-[#a2a7b0]">
                        No Neutral Comments Found!!
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            )}

            {loading == "False" && classify == "Inquiry" && (
              <div>
                {inquiryComments.length > 0 ? (
                  <div>
                    {inquiryComments.map((Emotions, index) => (
                      <div key={index}>
                        {
                          <div className="container flex gap-3 items-center my-2 w-full mx-auto ">
                            <div className="flex gap-2 mt-4 w-full ">
                              <img
                                className="w-7 h-7 rounded-full"
                                src={confusion}
                                alt="inquiry"
                              />

                              <div className="flex flex-col gap-1 w-full overflow-clip">
                                <h1 className="font-SagarFont font-medium text-sm text-[#565656]"></h1>
                                <p className="font-SagarFont text-sm text-wrap pr-1">
                                  {Emotions.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        }
                        <div className="border"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div className="w-full flex gap-2 my-10">
                      <img className="w-7 h-7" src={confusion} alt="" />
                      <h1 className="font-SagarFont text-xl font-semibold text-[#f87316]">
                        No Inquiry Comments Found!!
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            )}

            {loading == "False" && classify == "Dissapointed" && (
              <div>
                {angryComments.length > 0 ? (
                  <div>
                    {angryComments.map((Emotions, index) => (
                      <div key={index}>
                        {
                          <div className="container flex gap-3 items-center my-2 w-full mx-auto ">
                            <div className="flex gap-2 mt-4 w-full ">
                              <img
                                className="w-7 h-7 rounded-full"
                                src={angry}
                                alt="angry"
                              />

                              <div className="flex flex-col gap-1 w-full overflow-clip">
                                <h1 className="font-SagarFont font-medium text-sm text-[#565656]"></h1>
                                <p className="font-SagarFont text-sm text-wrap pr-1">
                                  {Emotions.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        }
                        <div className="border"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div className="w-full flex gap-2 my-10">
                      <img className="w-7 h-7" src={angry} alt="" />
                      <h1 className="font-SagarFont text-xl font-semibold text-[#e04141]">
                        No Angry Comments Found!!
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="md:w-[35%] lg:w-[25%]">
            <VideoQuery />
          </div>
        </div>
      </div>

      {showDialog && (
        <div className="w-full">
          <div className="fixed top-0 left-0 w-full h-full bg-stone-600 flex opacity-85 transition-opacity ease-in-out duration-1000"></div>
          <div className="fixed flex flex-col shadow-lg z-30 bg-white p-3 w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] 3xl:w-[20%] 4xl:w-[10%] 5xl:w-[5%] sm:left-[15%] md:left-[20%] lg:left-[25%] xl:left-[30%] 2xl:left-[35%] 3xl:left-[40%] 4xl:left-[45%] 5xl:left-[50%] h-[400px] sm:h-[250px] top-[25%] left-[10%] ">
            <div className="flex items-center gap-2 justify-between mb-5">
              <h1 className="font-SagarFont font-semibold text-lg">
                Analyze Comments
              </h1>
              <img
                onClick={handleClickClose}
                className="w-8 h-8 hover:cursor-pointer active:scale-75 ease-in-out duration-500"
                src={exit}
                alt=""
              />
            </div>

            <div className="flex flex-col justify-center items-center sm:justify-start sm:items-start">
              <h2 className="font-SagarFont font-medium p-2">
                Choose the amount of comments:
              </h2>
              <div className=" flex flex-col gap-3 w-full justify-center items-center sm:justify-start sm:items-start">
                <div className="flex flex-col gap-3 justify-center items-center w-full sm:flex-row ">
                  <div
                    onClick={() => handleCommentCount(100)}
                    className="border-[2px] border-red-600 py-2 px-4 rounded-md bg-red-500 w-[80%] sm:w-full flex justify-center items-center font-SagarFont font-medium text-lg text-white hover:bg-white transition-all ease-in-out duration-500 hover:text-black hover:cursor-pointer active:scale-90"
                  >
                    100
                  </div>
                  <div
                    onClick={() => handleCommentCount(200)}
                    className="border-[2px] border-red-600 py-2 px-4 rounded-md bg-red-500  w-[80%] sm:w-full flex justify-center items-center font-SagarFont font-medium text-lg text-white hover:bg-white transition-all ease-in-out duration-500 hover:text-black hover:cursor-pointer active:scale-90"
                  >
                    200
                  </div>
                </div>

                <div className="flex flex-col gap-3 justify-center items-center w-full sm:flex-row sm:justify-around">
                  <div
                    onClick={() => handleCommentCount(500)}
                    className="border-[2px] border-red-600 py-2 px-4 rounded-md bg-red-500 w-[80%] sm:w-full flex justify-center items-center font-SagarFont font-medium text-lg text-white hover:bg-white transition-all ease-in-out duration-500 hover:text-black hover:cursor-pointer active:scale-90"
                  >
                    500
                  </div>
                  <div
                    onClick={() => handleCommentCount(1000)}
                    className="border-[2px] border-red-600 py-2 px-4 rounded-md bg-red-500 w-[80%] sm:w-full flex justify-center items-center font-SagarFont font-medium text-lg text-white hover:bg-white transition-all ease-in-out duration-500 hover:text-black hover:cursor-pointer active:scale-90"
                  >
                    1000
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoInfo;
