import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../redux-setup/TestSlice";
export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export const upperCase = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
export const alphabets = upperCase.map((it) => it.toLowerCase());
const getItemValue = (type) => {
  switch (type) {
    case "number":
      let random = 1; // getRndInteger(1, 10);
      return random;
    case "a":
    case "A":
      let randomAlpha = 0; //getRndInteger(0, 5);
      return type == "a" ? alphabets[randomAlpha] : upperCase[randomAlpha];
    default:
      break;
  }
};
const Generator = () => {
  const items = useSelector((state) => state.TestSlice.items);
  const dispatch = useDispatch();
  const generators = [
    { name: "Numeric", item: "number", id: 1, char: 1 },
    { name: "Alphabets lowerCase", item: "a", id: 2, char: "a" },
    { name: "Alphabets UpperCase", item: "A", id: 3, char: "A" },
    // {name:"",item:"",id:1},
  ];
  const generate = (item) => {
    let itemValue = getItemValue(item);
    let temp = JSON.parse(JSON.stringify(items));
    function setValue(val) {
      let random = getRndInteger(0, 50);
      if (!temp[random]) {
        temp[random] = itemValue;
      } else {
        setValue(val);
      }
    }
    if (temp.length >= 50 && temp.every((it) => it)) {
      alert(
        "No more space. Merge or Remove the items from the board to generate more items."
      );
    } else {
      setValue(itemValue);
      dispatch(setItems(temp));
    }
  };
  return (
    <div className="flex flex-col p-4 gap-4 max-w-[20%] w-full">
      <h2 className="font-semibold text-sm lg:text-base text-center">
        Generators
      </h2>
      {generators.map(({ id, name, item, char }) => (
        <div
          onClick={() => {
            generate(item);
          }}
          className="select-none w-full cursor-pointer duration-300 transition-all ease-in-out hover:bg-gradient-to-br from-inherit via-yellow-400 to-red-500  p-4 rounded-lg border border-slate-300"
          key={id}
        >
          <div className="hidden lg:block">{name}</div>
          <div className="lg:hidden block">{char}</div>
        </div>
      ))}
    </div>
  );
};

export default Generator;
