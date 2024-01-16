import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCash, setItems, showConsole } from "../redux-setup/TestSlice";
import { alphabets, upperCase } from "./Generator";
import { Draggable } from 'react-beautiful-dnd';
import CommonDnd from "./CommonDND"
const FirstComp = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.TestSlice.items);
  const cash = useSelector((state) => state.TestSlice.cash);
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
      return { item: item + 1, index: item };
    } else {
      if (item?.toUpperCase() === item && item !== item?.toLowerCase()) {
        let ind = upperCase.findIndex((a) => a === item);
        return { item: upperCase[ind + 1], index: ind + 1 };
      } else if (item?.toUpperCase() !== item && item === item.toLowerCase()) {
        let ind = alphabets.findIndex((it) => it === item);
        return { item: alphabets[ind + 1], index: ind + 1 };
      }
    }
  };
  const setDnd = (src, dest) => {
    let temp = JSON.parse(JSON.stringify(items));
    if (items[src] === items[dest]) {
      temp[src] = null;
      let { item } = handleItem(items[src]);
      temp[dest] = item;
    } else {
      temp[src] = items[dest] || null;
      temp[dest] = items[src];
    }
    dispatch(setItems(temp));
  };
  const sell = (itemContent, i) => {
    let { index } = handleItem(itemContent);
    let temp = [...items];
    temp[i] = null;
    dispatch(setItems(temp));
    dispatch(setCash(cash + 2 ** (index - 1)));
  };
  return (
    <>
      <CommonDnd
        array={data}
        className="grid grid-cols-5 w-full h-screen p-4 gap-1"
        setArray={setDnd}
      >

        {data.map((a, i) => (
          <Draggable key={i} draggableId={i?.toString()} index={i}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                // style={getItemStyle(
                //   snapshot.isDragging,
                //   provided.draggableProps.style,
                // )}
                {...provided.dragHandleProps}
                onClick={(e) => {
                  if ([upperCase.at(-1), alphabets.at(-1)].includes(items[i])) {
                    e.stopPropagation();
                    sell(items[i], i);
                  }
                }}

                className={`${items[i]
                  ? "bg-blue-300 cursor-pointer shadow-lg border-blue-300 shadow-blue-300 group"
                  : ""
                  } border relative w-10 h-10 lg:w-16 lg:h-16  border-slate-300 rounded-lg flex justify-center items-center`}
                key={a}
              >
                {items[i]}
                <div
                  onClick={() => sell(items[i], i)}
                  className="bg-green-600 -top-3 -right-2 cursor-pointer rounded-full w-5 h-5 justify-center items-center text-white absolute group-hover:flex hidden"
                >
                  $
                </div>
              </div>
            )}
          </Draggable>
        ))}
      </CommonDnd>
    </>
  );
};

export default FirstComp;
