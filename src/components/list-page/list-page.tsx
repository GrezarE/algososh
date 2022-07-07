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
import styles from "./list-page.module.css";

class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export const ListPage: React.FC = () => {
  const [valueInput, setValueInput] = useState<string>("");
  const [indexInput, setIndexInput] = useState();
  const [result, setResult] = useState(
    Array.from({ length: 4 }, () => Math.floor(Math.random() * 100).toString())
  );
  const [tail, setTail] = useState<number>(result.length - 1);
  const [head, setHead] = useState<number>(0);
  const [list, setList] = useState(new Node(1));
  const [showHead, setShowHead] = useState<any>({ index: null, value: "" });
  const [showTail, setShowTail] = useState<any>({
    index: null,
    value: "",
  });
  const [color, setColor] = useState<ElementStates[]>(
    Array(4).fill(ElementStates.Default)
  );
  const [addHeadButton, setAddHeadButton] = useState({
    isLoader: false,
    disabled: false,
  });
  const [addTailButton, setAddTailButton] = useState({
    isLoader: false,
    disabled: false,
  });
  const [deleteHeadButton, setDeleteHeadButton] = useState({
    isLoader: false,
    disabled: false,
  });
  const [deleteTailButton, setDeleteTailButton] = useState({
    isLoader: false,
    disabled: false,
  });
  const [addIndexButton, setAddIndexButton] = useState({
    isLoader: false,
    disabled: false,
  });
  const [deleteIndexButton, setDeleteIndexButton] = useState({
    isLoader: false,
    disabled: false,
  });

  useEffect(() => {
    list.next = new Node(2);
    list.next.next = new Node(35);
    list.next.next.next = new Node(55);
    setList(list);
    console.log(list);
  }, [list]);

  const onChangeValue: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setValueInput(evt.target.value);
  };

  const onHeadAdd = async () => {
    if (!valueInput) {
      return null;
    }
    setShowHead({ index: head, value: valueInput });
    setHead(-1);
    await new Promise((resolve: any) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
    result.unshift(valueInput);
    setHead(0);
    setShowHead({ index: null, value: "" });
    setTail(result.length - 1);
    color[0] = ElementStates.Modified;
    setColor([...color]);
    setTimeout(() => {
      color[0] = ElementStates.Default;
      setColor([...color]);
    }, 1000);
  };

  const onTailAdd = async () => {
    if (!valueInput) {
      return null;
    }
    setShowHead({ index: tail, value: valueInput });
    await new Promise((resolve: any) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
    result.push(valueInput);
    setShowHead({ index: null, value: "" });
    setTail(result.length - 1);
    color[tail + 1] = ElementStates.Modified;
    setColor([...color]);
    setTimeout(() => {
      color[tail + 1] = ElementStates.Default;
      setColor([...color]);
    }, 1000);
  };

  const onHeadDelete = async () => {
    setShowTail({ index: head, value: result[head || 0] });
    result[head] = "";
    await new Promise((resolve: any) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
    result.shift();
    setResult([...result]);
    setShowTail({ index: null, value: "" });
    setTail(result.length - 1);
  };

  const onTailDelete = async () => {
    setShowTail({ index: tail, value: result[tail] });
    result[tail] = "";
    setTail(-1);
    await new Promise((resolve: any) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
    result.pop();
    setResult([...result]);
    setShowTail({ index: null, value: "" });
    setTail(result.length - 1);
  };

  const onIndexAdd = async () => {
    if (!valueInput || !indexInput) {
      return null;
    }
    
  };

  const onIndexDelete = async () => {
    if (!indexInput) {
      return null;
    }
    if (indexInput > result.length - 1) {
      return null;
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.form__box}>
        <Input
          maxLength={4}
          isLimitText={true}
          placeholder="Введите значение"
          extraClass={styles.input__extra}
          onChange={onChangeValue}
        />
        <Button
          text="Добавить в head"
          disabled={addHeadButton.disabled}
          isLoader={addHeadButton.isLoader}
          style={{ width: 175 }}
          onClick={onHeadAdd}
        />
        <Button
          text="Добавить в tail"
          disabled={addTailButton.disabled}
          isLoader={addTailButton.isLoader}
          style={{ width: 175 }}
          onClick={onTailAdd}
        />
        <Button
          text="Удалить из head"
          disabled={deleteHeadButton.disabled}
          isLoader={deleteHeadButton.isLoader}
          style={{ width: 175 }}
          onClick={onHeadDelete}
        />
        <Button
          text="Удалить из tail"
          disabled={deleteTailButton.disabled}
          isLoader={deleteTailButton.isLoader}
          style={{ width: 175 }}
          onClick={onTailDelete}
        />
      </div>
      <div className={styles.form__box}>
        <Input
          placeholder="Введите индекс"
          extraClass={styles.input__extra}
          type="number"
        />
        <Button
          text="Добавить по индексу"
          disabled={addIndexButton.disabled}
          isLoader={addIndexButton.isLoader}
          style={{ width: 362 }}
        />
        <Button
          text="Удалить по индексу"
          disabled={deleteIndexButton.disabled}
          isLoader={deleteIndexButton.isLoader}
          style={{ maxWidth: 362, width: 362 }}
        />
      </div>
      <div className={styles.circles__box}>
        {result &&
          result.map((item, index) => (
            <div className={styles.circle__box} key={`box-${index}`}>
              <Circle
                letter={showHead.value}
                isSmall={true}
                key={`top-${index}`}
                extraClass={
                  index === showHead.index
                    ? styles.circle__show
                    : styles.circle__hide
                }
                state={ElementStates.Changing}
              />
              <Circle
                letter={item}
                key={`main-${index}`}
                extraClass={styles.circle__arrow}
                index={index}
                tail={index === tail ? "tail" : ""}
                head={index === head ? "head" : ""}
                state={color[index]}
              />
              <Circle
                isSmall={true}
                letter={showTail.value}
                extraClass={
                  index === showTail.index
                    ? styles.bottom__circle_show
                    : styles.bottom__circle_hide
                }
                key={`bottom-${index}`}
                state={ElementStates.Changing}
              />
            </div>
          ))}
      </div>
      {/* <div>{list && <Circle letter={list.value.toString()} />}</div> */}
    </SolutionLayout>
  );
};
