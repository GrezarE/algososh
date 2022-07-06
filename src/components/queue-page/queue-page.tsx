import React, {
  useState,
  useRef,
  FormEventHandler,
  ChangeEventHandler,
  useEffect,
} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {
  const [inputText, changeInputText] = useState("");
  const [result, setResult] = useState<any[]>(Array(7).fill(null));
  const [color, setColor] = useState<any>(Array(7).fill(ElementStates.Default));
  const [tail, setTail] = useState<number>(0);
  const [head, setHead] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const ref = useRef<any>();

  const size = 7;

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

  const enqueue: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    if (length >= size) {
      return null;
    }
    if (tail === size) {
      let array = result;
      const arrayColor = color;
      arrayColor[0] = ElementStates.Changing;
      setColor([...arrayColor]);
      setAddButton({ isLoader: true, disabled: false });
      await new Promise((resolve: any) =>
        setTimeout(() => {
          resolve();
        }, 500)
      );
      array[0] = inputText;
      ref.current.reset();
      setResult([...array]);
      setTail(1);
      setAddButton({ isLoader: false, disabled: false });
      arrayColor[0] = ElementStates.Default;
      setColor([...arrayColor]);
    } else {
      let array = result;
      const arrayColor = color;
      arrayColor[tail] = ElementStates.Changing;
      setColor([...arrayColor]);
      setAddButton({ isLoader: true, disabled: false });
      await new Promise((resolve: any) =>
        setTimeout(() => {
          resolve();
        }, 500)
      );
      array[tail] = inputText;
      ref.current.reset();
      setResult([...array]);
      setAddButton({ isLoader: false, disabled: false });
      arrayColor[tail] = ElementStates.Default;
      setColor([...arrayColor]);
      setTail(tail + 1);
    }
    setLength(length + 1);
  };

  const dequeue = async () => {
    if (length === 0) {
      return null;
    }
    if (head === size) {
      const arrayColor = color;
      arrayColor[0] = ElementStates.Changing;
      setColor([...arrayColor]);
      let array = result;
      array[0] = null;
      await new Promise((resolve: any) =>
        setTimeout(() => {
          resolve();
        }, 500)
      );
      setResult([...array]);
      setHead(1);
      arrayColor[0] = ElementStates.Default;
      setColor([...arrayColor]);
    } else {
      const arrayColor = color;
      arrayColor[head] = ElementStates.Changing;
      let array = result;
      setColor([...arrayColor]);
      await new Promise((resolve: any) =>
        setTimeout(() => {
          resolve();
        }, 500)
      );
      array[head] = null;
      setResult([...array]);
      arrayColor[head] = ElementStates.Default;
      setColor([...arrayColor]);
      setHead(head + 1);
    }
    setLength(length - 1);
  };

  const onClear = () => {
    setResult(Array(7).fill(null));
    setHead(0);
    setTail(0);
    setLength(0);
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
    <SolutionLayout title="Очередь">
      <form className={styles.form__box} onSubmit={enqueue} ref={ref}>
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
          onClick={dequeue}
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
        {result.map((item: any, index: number) => (
          <Circle
            letter={item}
            key={index}
            index={index}
            tail={index === tail - 1 && length !== 0 ? "tail" : ""}
            head={
              index === head && length !== 0
                ? "head"
                : index === head - 1 && head === size
                ? "head"
                : ""
            }
            state={color[index]}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
