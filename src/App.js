import ButtonWrapper from "./ButtonWrapper";
import Wrapper from "./Wrapper";
import DisplayScreen from "./DisplayScreen";
import Button from "./Button";

import React, { useState } from "react";

const calcLayout = [
  ["C", "+/-", "^", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "()", "="],
];

const App = () => {
  const [calc, setCalc] = useState({ sign: "", num: 0, res: 0 });

  const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

  const removeSpaces = (num) => num.toString().replace(/\s/g, "");

  const math = (a, b, sign) =>
    sign === "+"
      ? a + b
      : sign === "-"
      ? a - b
      : sign === "X"
      ? a * b
      : sign === "^"
      ? a ** b
      : a / b;

  const numClickHandler = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    if (removeSpaces(calc.num.length < 16)) {
      setCalc({
        ...calc,
        num:
          removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const decimalClickHandler = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (event) => {
    setCalc({
      ...calc,
      sign: event.target.innerHTML,
      res: !calc.num
        ? calc.res
        : !calc.res
        ? calc.num
        : toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't Divide with 0"
            : math(
                Number(removeSpaces(calc.res)),
                Number(removeSpaces(calc.num)),
                calc.sign
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    });
  };

  const parenthesesHandler = () => {

  }
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Wrapper>
      <DisplayScreen value={calc.num ? calc.num : calc.res} />
      <ButtonWrapper>
        {calcLayout.flat().map((button, i) => {
          return (
            <Button
              key={i}
              className={button === "=" ? "equals" : ""}
              value={button}
              onClick={
                button === "C"
                  ? resetClickHandler
                  : button === "+/-"
                  ? invertClickHandler
                  : button === "="
                  ? equalsClickHandler
                  : button === "/" ||
                    button === "X" ||
                    button === "-" ||
                    button === "+" ||
                    button === "^"
                  ? signClickHandler
                  : button === "."
                  ? decimalClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default App;
