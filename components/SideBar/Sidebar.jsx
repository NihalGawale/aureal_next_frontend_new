"use client";
import React from "react";
import Button from "@mui/material/Button";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import StreamIcon from "@mui/icons-material/Stream";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ListIcon from "@mui/icons-material/List";
import Link from "next/link";
import Image from "next/image";


function Sidebar() {
  return (
    <div className="w-full h-full flex flex-col space-y-14">
    <div className="w-full h-[7%] flex justify-center items-end">
      <Image src="/assets/Aureal logo_light_primary lockup_horizontal-01.png" alt="aureal-logo" width={150} height={100} />
    </div>
    <div className=" text-gray-500  flex justify-center w-full">
      <div className="w-[50%] text-center space-y-5 font-serif text-xl  ">
      <Link className="flex  items-center space-x-3" href="/podcasts">
          <HomeIcon fontSize="small" />
          <p className="hover:text-white">Podcasts</p>
        </Link>


        <Link className="flex items-center space-x-3" href="/explore">
          <ExploreIcon fontSize="small" />
          <p className="hover:text-white">Explore</p>
        </Link>
        <Link className="flex items-center space-x-3" href="/liverooms">
          <StreamIcon fontSize="small" />
          <p className="hover:text-white">Live</p>
        </Link>
        <Link className="flex items-center space-x-3" href="/hosting">
          <PodcastsIcon fontSize="small" />
          <p className="hover:text-white">Hosting</p>
        </Link>
        <Link className="flex items-center space-x-3" href="/clips">
          <VideoLibraryIcon fontSize="small" />
          <p className="hover:text-white">Clips</p>
        </Link>
      </div>

    
        {/* <Link className="flex items-center space-x-2" href="/">
          <ListIcon fontSize="small" />
          <p>Playlists</p>
        </Link> */}

      {/* <Link className='text-white' href=""> Playlists</Link> */}
    </div>
    </div>
  );
}

export default Sidebar;
