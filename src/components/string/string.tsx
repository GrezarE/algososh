import React, { useState, ChangeEventHandler, FormEventHandler } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import styles from "./string.module.css";

interface ICircle {
  color: ElementStates,
  letter: string
}

export const StringComponent: React.FC = () => {
  const [inputText, changeInputText] = useState("");
  const [result, setResult] = useState<ICircle[]>();

  const stringReverse = (text: string) => {
    let obj = text.split("").map((item) => {
      return { color: ElementStates.Default, letter: item };
    });
    setResult([...obj]);
    for (let i = 0; i < obj.length / 2; i++) {
      (function () {
        setTimeout(() => {
          obj[i] = { ...obj[i], color: ElementStates.Changing };
          obj[obj.length - 1 - i] = {
            ...obj[obj.length - 1 - i],
            color: ElementStates.Changing,
          };
          setResult([...obj]);
          setTimeout(() => {
            const first = obj[i].letter;
            const second = obj[obj.length - 1 - i].letter;
            obj[i] = { letter: second, color: ElementStates.Modified };
            obj[obj.length - 1 - i] = {
              letter: first,
              color: ElementStates.Modified,
            };
            setResult([...obj]);
          }, DELAY_IN_MS);
        }, DELAY_IN_MS * i);
      })();
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    changeInputText(evt.target.value);
  };
  const onSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    stringReverse(inputText);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form__box} onSubmit={onSubmit}>
        <Input maxLength={11} isLimitText={true} onChange={onChange} />
        <Button text="Развернуть" type="submit" />
      </form>
      <div className={styles.circles__box}>
        {result &&
          result.map((item: ICircle, index: number) => (
            <Circle letter={item.letter} state={item.color} key={index} />
          ))}
      </div>
    </SolutionLayout>
  );
};
