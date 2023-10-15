import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetDataQuery,
  useLazyGetDatabyparamsQuery,
} from "../redux-setup/apiSlice";
import { setItems, showConsole } from "../redux-setup/TestSlice";
import { alphabets, upperCase } from "./Generator";

const FirstComp = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.TestSlice.items);
  const dat = () => {
    let dat = [];
    // useEffect(()=>{
    for (let i = 0; i < 50; i++) {
      dat[i] = i + 1;
    }
    return dat;
  };
  const data = dat();
  const dragItem = useRef(null);
  const dropItem = useRef(null);
  const dragStart = (i) => {
    dragItem.current = i;
  };
  const dragEnter = (i) => {
    dropItem.current = i;
  };
  const handleItem = (item) => {
    if (typeof item === "number") {
      return item + 1;
    } else {
      if (item?.toUpperCase() === item && item !== item?.toLowerCase()) {
        return upperCase[upperCase.findIndex((a) => a === item) + 1];
      } else if (item?.toUpperCase() !== item && item === item.toLowerCase()) {
        return alphabets[alphabets.findIndex((it) => it === item) + 1];
      }
    }
  };
  const dragEnd = () => {
    if (dragItem.current === dropItem.current || dropItem.current === null) {
      dragItem.current = null;
      dropItem.current = null;
    } else {
      let temp = JSON.parse(JSON.stringify(items));
      if (items[dragItem.current] === items[dropItem.current]) {
        temp[dragItem.current] = null;
        temp[dropItem.current] = handleItem(items[dragItem.current]);
      } else {
        temp[dragItem.current] = items[dropItem.current] || null;
        temp[dropItem.current] = items[dragItem.current];
      }
      dispatch(setItems(temp));
      dragItem.current = null;
      dropItem.current = null;
    }
  };
  return (
    <>
      <div className="grid grid-cols-5 w-full h-screen p-4 gap-1">
        {data.map((a, i) => (
          <div
            draggable
            onDragStart={() => dragStart(i)}
            onTouchStart={() => dragStart(i)}
            onTouchEnd={() => dragEnd()}
            ontouch
            // onTouchMove={() => dragEnter(i)}
            onDragEnter={() => dragEnter(i)}
            onDragEnd={() => dragEnd()}
            className={`${
              items[i]
                ? "bg-blue-300 shadow-lg border-blue-300 shadow-blue-300"
                : ""
            } border w-10 h-10 lg:w-16 lg:h-16  border-slate-300 rounded-lg flex justify-center items-center`}
            key={a}
          >
            {items[i]}
          </div>
        ))}
      </div>
    </>
  );
};

export default FirstComp;
