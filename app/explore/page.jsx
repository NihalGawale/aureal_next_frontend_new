"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Explore/Header"; 
import Body from "@/components/Explore/Body";
import Sidebar from "@/components/SideBar/Sidebar";

export default function ExplorePage() {
  const [explorePodcastData, setExplorePodcastData] = useState([]);

  const explore = async () => {
    await fetch(
      `https://api.aureal.one/public/explore?user_id=b98d4c481562e1217819fbe4c34ade34`,
      { next: { revalidate: 60 } }
    )
      .then((response) => response.json())
      .then((data) => setExplorePodcastData(data.data));
  };

  useEffect(() => {
    explore();
  }, []);
  return (
    <div id="Explore" className="flex">
      <div
        id="SideBar"
        className="w-[14%] h-screen  hidden lg:block"
      >
        <Sidebar />
      </div>
      <div
        id="Explore-Component"
        className="w-screen lg:w-[86%] h-screen bg-black "
      >
        <div className="w-[100%] h-[100%] overflow-x-hidden">
          <Header />
          <Body data={explorePodcastData} />
        </div>
      </div>
    </div>
  );
}
