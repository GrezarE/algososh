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
import { LinkedList, Node } from "./linked-list";
import { ElementStates } from "../../types/element-states";
import styles from "./list-page.module.css";

// class Node<T> {
//   value: T;
//   next: Node<T> | null;
//   constructor(value: T, next?: Node<T> | null) {
//     this.value = value;
//     this.next = next === undefined ? null : next;
//   }
// }

export const ListPage: React.FC = () => {
  const linkedList = new LinkedList<any>();
  const linkRef = useRef(linkedList);

  const createArr = () => {
    const arrLength = Math.floor(Math.random() * 6 + 1);
    const rArray = Array.from({ length: arrLength }, () =>
      Math.floor(Math.random() * 9999)
    );
    return rArray;
  };

  const randomArray = createArr();
  randomArray.map((item) => linkedList.append(item));

  // useEffect(() => {
  //   const randomArray = createArr();
  //   randomArray.map((item) => linkedList.append(item));
  // }, []);

  const [valueInput, setValueInput] = useState<any>("");
  const [indexInput, setIndexInput] = useState<any>();
  const [result, setResult] = useState(
    Array.from({ length: 4 }, () => Math.floor(Math.random() * 100).toString())
  );
  const [tail, setTail] = useState<number>(linkRef.current.getSize() - 1);
  const [head, setHead] = useState<number>(0);
  const [showHead, setShowHead] = useState<any>({ index: null, value: "" });
  const [showTail, setShowTail] = useState<any>({
    index: null,
    value: "",
  });
  const [color, setColor] = useState<ElementStates[]>(
    Array(4).fill(ElementStates.Default)
  );
  const refValue = useRef<any>();
  const refIndex = useRef<any>();

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

  const onChangeValue: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setValueInput(evt.target.value);
  };

  const onChangeIndex: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setIndexInput(evt.target.value);
  };

  const resetForms = () => {
    refIndex.current.reset();
    refValue.current.reset();
  };

  const clearValue = () => {
    setValueInput(null);
    setIndexInput(null);
  };

  const onHeadAdd = async () => {
    if (!valueInput) {
      return null;
    }
    setShowHead({ index: head, value: valueInput });
    setHead(-1);
    setAddHeadButton({ isLoader: true, disabled: false });
    await new Promise((resolve: any) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
    result.unshift(valueInput);
    refValue.current.reset();
    clearValue();
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
    setAddTailButton({ isLoader: true, disabled: false });
    await new Promise((resolve: any) =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );
    result.push(valueInput);
    clearValue();
    resetForms();
    setShowHead({ index: null, value: "" });
    setTail(result.length - 1);
    color[tail + 1] = ElementStates.Modified;
    setColor([...color]);
    setTimeout(() => {
      color[tail + 1] = ElementStates.Default;
      setColor([...color]);
    }, 1000);
    setAddTailButton({ isLoader: false, disabled: false });
  };

  const onHeadDelete = async () => {
    setShowTail({ index: head, value: result[head || 0] });
    result[head] = "";
    setDeleteHeadButton({ isLoader: true, disabled: false });

    await new Promise((resolve: any) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
    result.shift();
    setResult([...result]);
    setShowTail({ index: null, value: "" });
    setTail(result.length - 1);
    setDeleteHeadButton({ isLoader: false, disabled: false });
  };

  const onTailDelete = async () => {
    setShowTail({ index: tail, value: result[tail] });
    result[tail] = "";
    setTail(-1);
    setDeleteTailButton({ isLoader: true, disabled: false });
    await new Promise((resolve: any) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
    result.pop();
    setResult([...result]);
    setShowTail({ index: null, value: "" });
    setTail(result.length - 1);
    setDeleteTailButton({ isLoader: false, disabled: false });
  };

  const onIndexAdd = async () => {
    if (!valueInput || !indexInput) {
      return null;
    }
    if (indexInput > result.length - 1) {
      return null;
    }
    const indexValue = indexInput;
    const value = valueInput;
    const defaultColor = color.slice();
    setShowHead({ index: head, value: value });
    setHead(-1);
    color[0] = ElementStates.Changing;
    setAddIndexButton({ isLoader: true, disabled: false });
    setAddHeadButton({ isLoader: false, disabled: true });
    setAddTailButton({ isLoader: false, disabled: true });
    setDeleteHeadButton({ isLoader: false, disabled: true });
    setDeleteTailButton({ isLoader: false, disabled: true });
    setDeleteIndexButton({ isLoader: false, disabled: true });

    for (let i = 1; i <= indexValue; i++) {
      await new Promise((resolve: any) =>
        setTimeout(() => {
          resolve();
        }, 1000)
      );
      setShowHead({ index: i, value: value });
      color[i] = ElementStates.Changing;
      setColor([...color]);
      setHead(0);
    }

    await new Promise((resolve: any) =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );
    defaultColor[indexValue] = ElementStates.Modified;
    setColor([...defaultColor]);
    result.splice(indexValue, 0, value);
    setResult([...result]);
    setShowHead({ index: null, value: "" });
    setTail(result.length - 1);
    clearValue();
    resetForms();
    setDeleteHeadButton({ isLoader: false, disabled: false });
    setDeleteTailButton({ isLoader: false, disabled: false });
    setTimeout(() => {
      defaultColor[indexValue] = ElementStates.Default;
      setColor([...defaultColor]);
    }, 1000);
  };

  const onIndexDelete = async () => {
    if (!indexInput) {
      return null;
    }
    if (indexInput > result.length - 1) {
      return null;
    }
    const indexValue = Number(indexInput);
    const value = result[indexInput];
    const defaultColor = color.slice();
    setAddIndexButton({ isLoader: false, disabled: true });
    setAddHeadButton({ isLoader: false, disabled: true });
    setAddTailButton({ isLoader: false, disabled: true });
    setDeleteHeadButton({ isLoader: false, disabled: true });
    setDeleteTailButton({ isLoader: false, disabled: true });
    setDeleteIndexButton({ isLoader: true, disabled: false });

    for (let i = 0; i <= indexValue; i++) {
      await new Promise((resolve: any) =>
        setTimeout(() => {
          resolve();
        }, 1000)
      );
      color[i] = ElementStates.Changing;
      setColor([...color]);
    }
    if (indexValue === tail) {
      setTail(-1);
    }
    setShowTail({ index: indexValue, value: value });
    result[indexValue] = "";
    setResult([...result]);

    await new Promise((resolve: any) =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );
    clearValue();
    resetForms();
    result.splice(indexValue, 1);
    setResult([...result]);
    setShowTail({ index: null, value: "" });
    setColor([...defaultColor]);
    setTail(result.length - 1);
    setDeleteIndexButton({ isLoader: false, disabled: false });
    setIndexInput(null);
  };

  useEffect(() => {
    if (indexInput) {
      setDeleteIndexButton({ isLoader: false, disabled: false });
    } else {
      setDeleteIndexButton({ isLoader: false, disabled: true });
    }
  }, [indexInput]);

  useEffect(() => {
    if (!indexInput || !valueInput) {
      setAddIndexButton({ isLoader: false, disabled: true });
    } else {
      setAddIndexButton({ isLoader: false, disabled: false });
    }
  }, [indexInput, valueInput]);

  useEffect(() => {
    if (valueInput) {
      setAddHeadButton({ isLoader: false, disabled: false });
      setAddTailButton({ isLoader: false, disabled: false });
    } else {
      setAddHeadButton({ isLoader: false, disabled: true });
      setAddTailButton({ isLoader: false, disabled: true });
    }
  }, [valueInput]);

  useEffect(() => {
    console.log(linkRef.current);
    console.log(tail);
  }, [linkRef]);

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form__box} ref={refValue}>
        <Input
          maxLength={4}
          isLimitText={true}
          placeholder="Введите значение"
          extraClass={styles.input__extra}
          onInput={onChangeValue}
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
      </form>
      <form className={styles.form__box} ref={refIndex}>
        <Input
          placeholder="Введите индекс"
          extraClass={styles.input__extra}
          type="number"
          onInput={onChangeIndex}
        />
        <Button
          text="Добавить по индексу"
          disabled={addIndexButton.disabled}
          isLoader={addIndexButton.isLoader}
          style={{ width: 362 }}
          onClick={onIndexAdd}
        />
        <Button
          text="Удалить по индексу"
          disabled={deleteIndexButton.disabled}
          isLoader={deleteIndexButton.isLoader}
          style={{ maxWidth: 362, width: 362 }}
          onClick={onIndexDelete}
        />
      </form>
      <div className={styles.circles__box}>
        {linkRef &&
          linkRef.current.toArray().map((item, index) => (
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
        {/* {result &&
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
          ))} */}
      </div>
      {/* <div>{list && <Circle letter={list.value.toString()} />}</div> */}
    </SolutionLayout>
  );
};
