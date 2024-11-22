import { useState, useEffect } from "react";
import React from "react";

function Card(props) {
  console.log("Props : ", props.imgUrl);
  if (!(props.author || props.imgUrl)) return;
  return (
    <>
      <div className=" m-10 border w-[350px] h-[400px] rounded-xl p-8 hover:bg-gray-800 transition-all duration-400">
        <div className=" flex-wrap gap-1 mb-1">
          <div className="w-full border-red-500 rounded-xl overflow-hidden aspect-video w-full">
            <img
              src={props.imgUrl}
              alt="image"
              className=" object-center object-cover"
            />
          </div>
        </div>

        <div className="mb-2">
          <p className=" leading-7">
            <b className="title">{props.tittle}</b>
            {props.description?.substring(0, 100)}
          </p>
        </div>
        <div className="">
          <div className="flex items-center gap-2 ">
            <span className="font-semibold text-gray-500">Source :</span>
            <a
              href={props.url}
              target="_blank"
              className="link underline break-words text-gray-500"
            >
              {props.source.substring(0, 70)}
            </a>
          </div>

          <div className="origin flex flex-col text-sm">
            <p className="text-gray-500">
              <span className="font-semibold text-gray-500">Author : </span>
              {props.author}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold text-gray-500">
                Published at :{" "}
              </span>
              ({props.publishedAt})
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
