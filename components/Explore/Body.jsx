import React from "react";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import ExploreCards from "./ExploreCards";
import Category from "./Category";
const Body = ({data}) => {
  return (
    <div
      id="explore-body"
      className="w-[100%] h-[93%] flex justify-center items-center flex-col overflow-y-auto overflow-x-hidden pb-0 lg:pb-14 "
    >
      <div id="Category" className="w-[100%] h-[10%]">
      {
          data.map((data) => (
           data.name === "Categories" ? <Category key={data.name} name={data.name} api={data.api} /> : null
          ))
        }
       
      </div>
      {/* <Category /> */}
      <div id="Featured" className="explore-components flex flex-col">
        <div id="title" className="w-full h-[10%]  flex pr-3 items-center">
          <p className="sm:text-xl text-gray-400 lg:pl-3">Featured</p>
        </div>
        {
          data.map((data) => (
           data.name === "Featured" ? <ExploreCards key={data.name} name={data.name} api={data.api} /> : null
          ))
        }
       
      </div>
      <div id="New-in-hive" className="explore-components flex flex-col">
        <div id="heading" className="w-full h-[10%] flex items-center pr-3">
          <p className="sm:text-xl text-gray-400 lg:pl-3">New in Hive</p>
        </div>
        {
          data.map((data) => (
           data.name === "New in Hive" ? <ExploreCards  key={data.name} name={data.name} api={data.api} /> : null
          ))
        }
      </div>
    </div>
  );
};

export default Body;
