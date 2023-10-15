import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCash, setItems } from "../redux-setup/TestSlice";
export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
const getItemValue = (type, cash) => {
  if (cash) {
    let random = getRndInteger(0, 15);
    let all = [alphabets, upperCase];
    let rand = getRndInteger(0, 2);
    return rand == 2 ? random + 1 : all[rand][random];
  } else {
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
  }
};
const Generator = () => {
  const items = useSelector((state) => state.TestSlice.items);
  const cash = useSelector((state) => state.TestSlice.cash);
  const dispatch = useDispatch();
  const generators = [
    { name: "Number (free)", item: "number", id: 1, char: 1 },
    { name: "Alphabets LowerCase (free)", item: "a", id: 2, char: "a" },
    { name: "Alphabets UpperCase (free)", item: "A", id: 3, char: "A" },
    { name: "Random with cash ($5)", item: "random", id: 4, char: "$" },
  ];
  const generate = (item, cash) => {
    let itemValue = getItemValue(item, cash);
    let temp = JSON.parse(JSON.stringify(items));
    function setValue(val) {
      let random = getRndInteger(0, 49);
      if (!temp[random]) {
        temp[random] = itemValue;
      } else {
        setValue(val);
      }
    }
    if (temp.length >= 50 && temp.every((it) => it)) {
      alert(
        "No more space. Merge or Sell the items from the board to generate more items."
      );
    } else {
      setValue(itemValue);
      cash && dispatch(setCash(cash - 5));
      dispatch(setItems(temp));
    }
  };
  function formatCurrency(number, currencyCode = "USD", locale = "en-US") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
    }).format(number);
  }
  return (
    <div className="flex flex-col p-4 gap-4 max-w-[20%] w-full">
      <h2 className="font-semibold text-sm lg:text-base text-center">
        Generators
      </h2>
      <p>Available Cash ({formatCurrency(cash)})</p>
      {generators.map(({ id, name, item, char }) => (
        <button
          disabled={item == "random" && cash < 5}
          onClick={() => {
            item == "random" && cash >= 5
              ? generate(item, cash)
              : generate(item);
          }}
          className="select-none w-full disabled:opacity-50 duration-300 transition-all ease-in-out bg-gradient-to-br from-inherit via-yellow-400 to-red-500  p-4 rounded-lg border border-slate-300"
          key={id}
        >
          <div className="hidden lg:block">{name}</div>
          <div className="lg:hidden block">{char}</div>
        </button>
      ))}
      <p>
        Click the above buttons to generate values. Two same values can be merge
        to generate the relatively next value (e.g. 1 and 1 will make 2. 2 and 2
        will make 3. same for alphabets a and a will make a 'b' and b + b will
        make a 'c'.). Merge all the same values and sell them to earn cash. If
        you have enough cash you can generate random value witch can be sold for
        heigher value. Enjoy
      </p>
    </div>
  );
};

export default Generator;
