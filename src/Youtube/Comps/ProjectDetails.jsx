import React, { useState } from "react";
import arrowRed from "../../assets/arrowRed.png";
import arrowBlack from "../../assets/arrowBlack.png";

const ProjectDetails = () => {
  const [color, setColor] = useState("");
  return (

    <div className="flex justify-center items-center">
    <div className="mt-10 flex flex-col md:flex-row-reverse md:gap-2 max-w-screen-lg">
      <div className="bg-[#f1f6fc] w-full md:w-[40%] mt-5 h-[50%]">
        <div className="flex flex-col w-full">
          <span className="m-3 mt-8 flex justify-center items-center w-[50%] md:w-[70%] bg-red-600 text-white font-SagarFont font-medium text-sm p-2 rounded-full">
            Jump to section
          </span>
          <h1 className="m-3 flex justify-start items-center w-full font-SagarFont font-semibold text-2xl mt-5 p-2">
            Table of Contents:
          </h1>
          <div className="flex flex-col m-3 p-2  gap-4">
            <a href="#introduction">
              <div
                onClick={() => setColor("red1")}
                className="flex group hover:cursor-pointer"
              >
                <img
                  className="w-7 h-7 mx-2"
                  src={color === "red1" ? arrowRed : arrowBlack}
                  alt=""
                />
                <h2
                  className={`font-SagarFont font-semibold text-xl ${
                    color == "red1" ? "text-red-600" : "text-[#464343]"
                  } group-hover:underline `}
                >
                  What is youtube comment analyzer?
                </h2>
              </div>
            </a>

            <div className="flex flex-col gap-1">
              <a href="#methodology">
                <div
                  onClick={() => setColor("red2")}
                  className="flex group hover:cursor-pointer "
                >
                  <img
                    className="w-7 h-7 mx-2"
                    src={color === "red2" ? arrowRed : arrowBlack}
                    alt=""
                  />
                  <h2
                    className={`font-SagarFont font-semibold text-xl ${
                      color == "red2" ? "text-red-600" : "text-[#464343]"
                    } group-hover:underline`}
                  >
                    Steps followed in building this Project
                  </h2>
                </div>
              </a>

              <div className="flex flex-col gap-1 md:gap-4">
                <a href="#dataCollection">
                  <div
                    onClick={() => setColor("red3")}
                    className="flex group hover:cursor-pointer ml-5 mt-1 md:mt-2 "
                  >
                    <img
                      className="w-6 h-6 mx-2"
                      src={color === "red3" ? arrowRed : arrowBlack}
                      alt=""
                    />
                    <h2
                      className={`font-SagarFont font-semibold text-lg ${
                        color == "red3" ? "text-red-600" : "text-[#464343]"
                      } group-hover:underline`}
                    >
                      Data collection to train{" "}
                    </h2>
                  </div>
                </a>

                <a href="#modelBuilding">
                  <div
                    onClick={() => setColor("red4")}
                    className="flex group hover:cursor-pointer ml-5 "
                  >
                    <img
                      className="w-6 h-6 mx-2"
                      src={color === "red4" ? arrowRed : arrowBlack}
                      alt=""
                    />
                    <h2
                      className={`font-SagarFont font-semibold text-lg ${
                        color == "red4" ? "text-red-600" : "text-[#464343]"
                      } group-hover:underline`}
                    >
                      Model building and training
                    </h2>
                  </div>
                </a>

                <a href="#testing">
                  <div
                    onClick={() => setColor("red5")}
                    className="flex group hover:cursor-pointer ml-5"
                  >
                    <img
                      className="w-6 h-6 mx-2"
                      src={color === "red5" ? arrowRed : arrowBlack}
                      alt=""
                    />
                    <h2
                      className={`font-SagarFont font-semibold text-lg ${
                        color == "red5" ? "text-red-600" : "text-[#464343]"
                      } group-hover:underline`}
                    >
                      Testing the Unseen data
                    </h2>
                  </div>
                </a>

                <a href="#integration">
                  <div
                    onClick={() => setColor("red6")}
                    className="flex group hover:cursor-pointer ml-5"
                  >
                    <img
                      className="w-6 h-6 mx-2"
                      src={color === "red6" ? arrowRed : arrowBlack}
                      alt=""
                    />
                    <h2
                      className={`font-SagarFont font-semibold text-lg ${
                        color == "red6" ? "text-red-600" : "text-[#464343]"
                      } group-hover:underline`}
                    >
                      Integration and deployment of model
                    </h2>
                  </div>
                </a>
              </div>
            </div>

            <a href="#limitation">
              <div
                onClick={() => setColor("red7")}
                className="flex group hover:cursor-pointer"
              >
                <img
                  className="w-7 h-7 mx-2"
                  src={color === "red7" ? arrowRed : arrowBlack}
                  alt=""
                />
                <h2
                  className={`font-SagarFont font-semibold text-xl ${
                    color == "red7" ? "text-red-600" : "text-[#464343]"
                  } group-hover:underline `}
                >
                  Limitation of this project
                </h2>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="md:border-[1px] md:w-[1px] md:h-[220vh] md:border-[#cfcfcf] md:mt-5"></div>

      <div className="flex flex-col w-full md:w-[60%]">
        <div className="border-[1px] mt-5 bg-black"></div>
        <div className="flex flex-col">
          <div id="introduction" className="mt-5 mx-2 flex flex-col gap-1">
            <h1 className="font-SagarFont font-semibold text-xl">
              What is youtube comment analyzer?
            </h1>
            <p className="font-SagarFont font-light text-lg">
              The{" "}
              <span className="text-red-500 font-medium">
                {" "}
                Youtube Comment Analyzer
              </span>{" "}
              is a web application that uses machine learning model to predict
              emotions in comments. It provides insights into the overall
              sentiment of the comments, including{" "}
              <span className="text-red-500 font-medium">
                {" "}
                five different classes
              </span>{" "}
              . Additionally, it offers metrics such as like ratio, indicating
              the proportion of likes, and views ratio, giving an indication of
              viewer engagement. This tool is valuable for content creators and
              marketers, as it helps them understand{" "}
              <span className="text-red-500 font-medium">
                {" "}
                audience sentiment
              </span>
              , engagement levels, and overall reception of their videos,
              allowing them to tailor their content strategy accordingly.
            </p>
          </div>

          <div id="methodology" className="mt-10 mx-2 flex flex-col gap-2">
            <h1 className="font-SagarFont font-semibold text-xl">
              Steps Followed in Building this Project
            </h1>
            <div id="dataCollection" className="flex flex-col mt-3">
              <h2 className="font-SagarFont font-medium text-lg">
                1) Data Collection to train
              </h2>
              <p className="font-SagarFont font-light text-lg">
                The <span className="text-red-500 font-medium"> dataset</span>{" "}
                is collected from{" "}
                <span className="text-red-500 font-medium">Youtube</span>,
                contains around{" "}
                <span className="text-red-500 font-medium"> 14,000 </span>
                English comments spanning various genres like movies, gaming,
                lectures, and music. After scraping, comments were labeled into
                <span className="text-red-500 font-medium">
                  {" "}
                  5 categories{" "}
                </span>{" "}
                like joy, angry, sadness, inquiry, and neutral, organizing the
                dataset for analysis.
              </p>
            </div>

            <div id="modelBuilding" className="flex flex-col mt-5">
              <h2 className="font-SagarFont font-medium text-lg">
                2) Model building and training
              </h2>
              <p className="font-SagarFont font-light text-lg">
                After collection and preprocessing, the data is trained using an
                <span className="text-red-500 font-medium"> LSTM </span> deep
                learning model with{" "}
                <span className="text-red-500 font-medium">
                  {" "}
                  word embeddings (w2v){" "}
                </span>
                . This LSTM layer has 100 units and a dropout of 0.4 to prevent
                overfitting. It uses optimization algorithms being more specific{" "}
                <span className="text-red-500 font-medium"> Adam</span>, along
                with activation functions more specific{" "}
                <span className="text-red-500 font-medium"> Softmax</span>.
              </p>
            </div>

            <div id="testing" className="flex flex-col mt-5">
              <h2 className="font-SagarFont font-medium text-lg">
                3) Testing the Unseen data
              </h2>
              <p className="font-SagarFont font-light text-lg">
                The model is then tested using{" "}
                <span className="text-red-500 font-medium"> 2,842</span> testing
                data. The LSTM achieves an overall accuracy of{" "}
                <span className="text-red-500 font-medium"> 80% </span>. The
                LSTM model yields an average precision of 80% and an average
                recall of 81%, and therefore an average f1-score of 80%.These
                scores can go higher upto{" "}
                <span className="text-red-500 font-medium"> &gt;95%</span>, if
                we can fetch more comments and provide quality labels to them.
              </p>
            </div>

            <div id="integration" className="flex flex-col mt-5">
              <h2 className="font-SagarFont font-medium text-lg">
                4)Integration and deployment of model
              </h2>
              <p className="font-SagarFont font-light text-lg">
                The model is integrated into a React app and deployed using
                <span className="text-red-500 font-medium"> FastAPI</span> on
                Railway.app. Additionally, the web app is hosted on
                <span className="text-red-500 font-medium"> Netlify</span> for
                accessibility. Also, the{" "}
                <span className="text-red-500 font-medium"> Youtube API</span>{" "}
                is utilized to fetch all comments, that are then sent to Model
                Api for
                <span className="text-red-500 font-medium">
                  {" "}
                  classification
                </span>
                . This integration allows for a professional and seamless user
                experience, combining the power of{" "}
                <span className="text-red-500 font-medium">
                  machine learning
                </span>{" "}
                with efficient deployment and API utilization.
              </p>
            </div>
          </div>

          <div id="limitation" className="my-10 mx-2 flex flex-col gap-1">
            <h1 className="font-SagarFont font-semibold text-xl">
              Limitation of this project{" "}
            </h1>
            <p className="font-SagarFont font-light text-lg">
              Since the model is trained on{" "}
              <span className="text-red-500 font-medium">
                {" "}
                English comments{" "}
              </span>{" "}
              only, it won't properly analyze comments in other languages. This{" "}
              <span className="text-red-500 font-medium"> limitation</span>{" "}
              arises because the model learns patterns specific to English text.
              When presented with comments in other languages, it may{" "}
              <span className="text-red-500 font-medium"> misinterpret</span> or
              fail to recognize the meaning accurately.
            </p>
          </div>
        </div>

        <div className="flex w-full justify-end items-center p-2 mb-10">
            <span className="font-SagarFont font-semibold hover:text-red-600 text-md hover:cursor-pointer transition-all ease-in-out duration-200 active:scale-90">View Github Code</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
