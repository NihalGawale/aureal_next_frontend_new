import { Tooltip } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
const ExploreCards = ({ name, api }) => {
  const [podcasts, setPodcasts] = useState([]);

  const getExplorePodcasts = async () => {
    await fetch(
      `https://api.aureal.one/public/${api}?user_id=b98d4c481562e1217819fbe4c34ade34`,
      { next: { revalidate: 60 } }
    )
      .then((response) => response.json())
      .then((data) => setPodcasts(data.data));
  };

  useEffect(() => {
    getExplorePodcasts();
  }, []);

  console.log(name, api, "explorecards");
  console.log(podcasts, "expolre podcasts");
  return (
    <div className="w-[100%] h-[85%] flex">
      <div className="w-[100%] h-[100%] flex flex-col flex-wrap  overflow-x-scroll scrollbar-hide pr-5 space-x-3  lg:space-x-6  lg:px-3 pt-3 overflow-y-hidden lg:pt-3">
        {podcasts.map((podcast) => (
          
          <div  key={podcast.name} className="w-46 h-[100%] flex flex-col justify-center  sm:w-52 sm:h-[100%]  hover:cursor-pointer space-y-2  sm:space-y-3 ">
            <div className="w-40 h-[80%] sm:w-[100%] sm:h-[85%] rounded-xl relative   overflow-hidden transform transition duration-500 hover:scale-105">
              <Image src={podcast.image} fill alt="podcast-cards" />
            </div>
            <div className="w-40 h-auto sm:w-[100%]  flex flex-col text-sm space-y-1">
              <Tooltip title={`${podcast.name}`} arrow>
                <div className="podcastName w-full">{podcast.name}</div>
              </Tooltip>
              {/* <div className="w-full h-[55%] text-xs font-light flex flex-row justify-between">
                <div>{podcast.author}</div>
                <div className="w-[40%] h-[78%] bg-[#393737] rounded-full px-1 flex items-center  ">
                  <ExpandCircleDownOutlinedIcon className="rotate-180 text-xl"/> 1
                  <p> |</p>

                </div>
              </div> */}
              <div className=" text-xs font-light">{podcast.author}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCards;
