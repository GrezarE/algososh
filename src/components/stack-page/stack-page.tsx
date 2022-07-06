import React, {
  useState,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [inputText, changeInputText] = useState("");
  const [result, setResult] = useState<string[]>([]);
  const [color, setColor] = useState<ElementStates>();
  const ref = useRef<any>();
  const [addButton, setAddButton] = useState({
    isLoader: false,
    disabled: true,
  });
  const [deleteButton, setDeleteButton] = useState({
    isLoader: false,
    disabled: true,
  });
  const [clearButton, setClearButton] = useState({
    isLoader: false,
    disabled: true,
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    changeInputText(evt.target.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    if (inputText.length < 1) {
      return;
    }
    let array = result;
    array.push(inputText);
    setResult([...array]);
    setColor(ElementStates.Changing);
    ref.current.reset();
    changeInputText("");
    await new Promise((resolve: any) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
    setColor(ElementStates.Default);
  };

  const onDelete = async () => {
    setColor(ElementStates.Changing);
    await new Promise((resolve: any) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
    setColor(ElementStates.Default);
    let array = result;
    array.pop();
    setResult([...array]);
  };

  const onClear = () => {
    setResult([]);
  };

  useEffect(() => {
    if (result.length < 1) {
      setDeleteButton({ isLoader: false, disabled: true });
      setClearButton({ isLoader: false, disabled: true });
    } else {
      setDeleteButton({ isLoader: false, disabled: false });
      setClearButton({ isLoader: false, disabled: false });
    }
  }, [result]);

  useEffect(() => {
    if (!inputText) {
      setAddButton({ isLoader: false, disabled: true });
    } else {
      setAddButton({ isLoader: false, disabled: false });
    }
  }, [inputText]);

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form__box} onSubmit={onSubmit} ref={ref}>
        <Input maxLength={4} isLimitText={true} onChange={onChange} />
        <Button
          text="Добавить"
          type="submit"
          disabled={addButton.disabled}
          isLoader={addButton.isLoader}
        />
        <Button
          style={{ marginRight: 68 }}
          text="Удалить"
          onClick={onDelete}
          disabled={deleteButton.disabled}
          isLoader={deleteButton.isLoader}
        />
        <Button
          text="Очистить"
          onClick={onClear}
          disabled={clearButton.disabled}
          isLoader={clearButton.isLoader}
        />
      </form>
      <div className={styles.circles__box}>
        {result &&
          result.map((item: string, index: number) => (
            <Circle
              letter={item}
              key={index}
              head={index === result.length - 1 ? "top" : ""}
              state={index === result.length - 1 ? color : undefined}
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
