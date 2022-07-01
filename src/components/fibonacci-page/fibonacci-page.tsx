import React, { useState, ChangeEventHandler, FormEventHandler, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputText, changeInputText] = useState<any>();
  const [result, setResult] = useState<number[]>();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const fibonacci = (n: number) => {
    let fibonacciArr = [0, 1];
    let fibonacciResult: number[] = [];
    fibonacciResult.push(1);
    setResult([...fibonacciResult]);
    setTimeout(() => {
      for (let i = 0; i < n; i++) {
        (function () {
          setTimeout(() => {
            fibonacciArr.push(fibonacciArr[i] + fibonacciArr[i + 1]);
            fibonacciResult.push(fibonacciArr[i] + fibonacciArr[i + 1]);
            setResult([...fibonacciResult]);
          }, SHORT_DELAY_IN_MS * i);
        })();
      }
    }, SHORT_DELAY_IN_MS);
    setTimeout(() => {
      setIsLoader(false);
    }, SHORT_DELAY_IN_MS * n);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    changeInputText(evt.target.value);
    console.log(evt.target.value);
  };
  const onSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    setIsLoader(true);
    fibonacci(inputText);
  };

  useEffect(() => {
    if (inputText >= 20) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
  }, [inputText])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form__box} onSubmit={onSubmit}>
        <Input isLimitText={true} onChange={onChange} type="number" max={19} />
        <Button text="Развернуть" type="submit" isLoader={isLoader} disabled={buttonDisabled}/>
      </form>
      <div
        className={
          result && result.length < 10
            ? styles.circles__box
            : styles.circles__box_big
        }
      >
        {result &&
          result.map((item, index) => (
            <Circle letter={item.toString()} key={index} index={index} />
          ))}
      </div>
    </SolutionLayout>
  );
};
