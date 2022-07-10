import React, {
  useState,
  useRef,
  ChangeEventHandler,
  useEffect,
  MouseEventHandler,
} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue";

export const QueuePage: React.FC = () => {
  const queue = new Queue<string>(7);
  const queueRef = useRef(queue);

  const tail = queueRef.current.getTail();
  const size = queueRef.current.getSize();
  const length = queueRef.current.getLength();
  const head = queueRef.current.getHead();

  const [inputText, changeInputText] = useState("");
  const [color, setColor] = useState<ElementStates[]>(
    Array(7).fill(ElementStates.Default)
  );
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

  const onEnqueue: MouseEventHandler<HTMLButtonElement> = async (evt) => {
    evt.preventDefault();

    if (!inputText || length >= size) {
      return null;
    }
    if (tail === size) {
      const arrayColor = color;
      arrayColor[0] = ElementStates.Changing;
      setColor([...arrayColor]);
      setAddButton({ isLoader: true, disabled: false });

      await new Promise((resolve: any) =>
        setTimeout(() => {
          resolve();
        }, 500)
      );

      queueRef.current.enqueue(inputText);

      ref.current.reset();
      changeInputText("");
      setAddButton({ isLoader: false, disabled: false });
      arrayColor[0] = ElementStates.Default;
      setColor([...arrayColor]);
    } else {
      const arrayColor = color;
      arrayColor[tail] = ElementStates.Changing;
      setColor([...arrayColor]);
      setAddButton({ isLoader: true, disabled: false });

      await new Promise((resolve: any) =>
        setTimeout(() => {
          resolve();
        }, 500)
      );

      ref.current.reset();
      changeInputText("");
      setAddButton({ isLoader: false, disabled: false });
      queueRef.current.enqueue(inputText);
      arrayColor[tail] = ElementStates.Default;
      setColor([...arrayColor]);
    }
  };

  const onDequeue = async () => {
    if (length === 0) {
      return null;
    }
    if (head === size) {
      const arrayColor = color;
      arrayColor[0] = ElementStates.Changing;
      setColor([...arrayColor]);
      queueRef.current.dequeue();

      await new Promise((resolve: any) =>
        setTimeout(() => {
          resolve();
        }, 500)
      );

      arrayColor[0] = ElementStates.Default;
      setColor([...arrayColor]);
    } else {
      const arrayColor = color;
      arrayColor[head] = ElementStates.Changing;
      setColor([...arrayColor]);

      await new Promise((resolve: any) =>
        setTimeout(() => {
          resolve();
        }, 500)
      );

      queueRef.current.dequeue();
      arrayColor[head] = ElementStates.Default;
      setColor([...arrayColor]);
    }
  };

  const onClear = async () => {
    setColor([...color]);
    queueRef.current.setClear();
  };

  useEffect(() => {
    if (length < 1) {
      setDeleteButton({ isLoader: false, disabled: true });
      setClearButton({ isLoader: false, disabled: true });
    } else {
      setDeleteButton({ isLoader: false, disabled: false });
      setClearButton({ isLoader: false, disabled: false });
    }
  }, [length]);

  useEffect(() => {
    if (!inputText) {
      setAddButton({ isLoader: false, disabled: true });
    } else {
      setAddButton({ isLoader: false, disabled: false });
    }
  }, [inputText]);

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form__box} ref={ref}>
        <Input maxLength={4} isLimitText={true} onInput={onChange} />
        <Button
          text="Добавить"
          disabled={addButton.disabled}
          isLoader={addButton.isLoader}
          onClick={onEnqueue}
        />
        <Button
          style={{ marginRight: 68 }}
          text="Удалить"
          onClick={onDequeue}
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
        {queueRef.current &&
          queueRef.current
            .getElements()
            .map((item: string | null, index: number) => (
              <Circle
                letter={item ? item : ""}
                key={index}
                index={index}
                tail={index === tail - 1 && length !== 0 ? "tail" : ""}
                head={
                  index === head && length !== 0
                    ? "top"
                    : index === head - 1 && head === size
                    ? "top"
                    : ""
                }
                state={color[index]}
              />
            ))}
      </div>
    </SolutionLayout>
  );
};
