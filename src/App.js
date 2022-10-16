import React from "react";
import "./style.css";
import React, {useState} from "react";

import Wrapper from"./components/Wrapper";
import ButtonBox from "./components/ButtonBox";
import Screen from "./components/Screen";
import Button from "./components/Button";

const btnValues = [
  ["c", "+-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6,"-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocalString =(num) =>
String(num). replace (/(?<!\...*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1");

const removeSpaces = (num) => num.toString().replace(/\s/g, ""); 

const App = () => {
  let [calc, setCalc] = useState({
sign: "",
num: 0,
res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length<16){
      setCalc({
        ...calc,
        num:
        calc.num === 0 && value === "0"
        ? "0"
        : removeSpaces(calc.num) % 1 === 0
        ? toLocaleString(Number(removeSpaces(calc.num + value)))
        : toLocaleString(calc.num + value),
        res: !calc.Sign ? 0 : calc.res,
      });
  }
};

const commaClickHandler = (e) => {
  e.preventDefault();
  const value = e. target.innerHTML;

  setCalc({
    ...calc,
    sign: value,
    res: !calc.res && calc.num ? calc.num :calc.res,
    num: 0,
  })
}

const equalsClickHandler = () => {
  if (calc.sign && calc.num) {
    const math = (a, b, sign) =>
    sign === "+"
    ? a + b
    :sign === "-"
    ? a - b
    : sign === "x"
    ? a * b
    : a / b;

    setCalc({
      ...calc,
      res:
      calc.num === "0" && calc.sign === "/"
      ? "can't divide with 0"
      : toLocalString(
        math(
          Numbsr(removeSpaces(calc.res)),
          Number(removeSpaces(calc.num)),
          calc.sign
        )
      ),
      sign: "",
      num: 0,
    })
  }
}
 
const invertClickHandler = () => {
  setCalc({
    ...calc,
    num: calc.num ? toLocalString(removeSpaces(calc.num) * -1) : 0,
    res: calc.res ? toLocalString(removeSpaces(calc.res) * -1) : 0,
    sign : "",
  })
}

const percentClickHandler = () => {
     let num = calc.num ? perseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? perseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= math.pow(100, 1)),
      res: (res /= math.pow(100, 1)),
      sign: "",
    })
};

const resetClickHandler = () =>{
  setCalc({
    ...calc,
    sign: "",
    num: 0,
    res: 0,
  })
}



  return (
    <Wrapper>
      <screen value={calc.num? calc.num : calc.res}/>
      <ButtonBox>
      {btnValues.flat().map((btn, i) => {
        return (
          <Button key={i} className={btn === "=" ? "equals" : ""} 
          value={btn}
          onClick={
            btn === "c"
            ? resetClickHandler
            : btn === '+-'
            ? invertClickHandler
            : btn === "%"
            ? percentClickHandler
            : btn === "="
            ? equalsClickHandler
            : btn === "/" || btn === "x" || btn === "-" || btn === "+"
            ? signClickHandler
            : btn ==="." 
            ? commaClickHandler
            : numClickHandler
          }
            />
        );
        })}
      </ButtonBox>
    </Wrapper>

  );
  
};

export default App;

