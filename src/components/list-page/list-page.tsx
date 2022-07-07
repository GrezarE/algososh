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

export const ListPage: React.FC = () => {
  const [valueInput, setValueInput] = useState();
  const [indexInput, setIndexInput] = useState();
  const [result, setResult] = useState(
    Array.from({ length: 4 }, () => Math.floor(Math.random() * 100).toString())
  );
  const [tail, setTail] = useState<number>(0);
  const [head, setHead] = useState<number>(0);
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

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.form__box}>
        <Input
          maxLength={4}
          isLimitText={true}
          placeholder="Введите значение"
          extraClass={styles.input__extra}
        />
        <Button
          text="Добавить в head"
          disabled={addHeadButton.disabled}
          isLoader={addHeadButton.isLoader}
          style={{ width: 175 }}
        />
        <Button
          text="Добавить в tail"
          disabled={addTailButton.disabled}
          isLoader={addTailButton.isLoader}
          style={{ width: 175 }}
        />
        <Button
          text="Удалить из head"
          disabled={deleteHeadButton.disabled}
          isLoader={deleteHeadButton.isLoader}
          style={{ width: 175 }}
        />
        <Button
          text="Удалить из tail"
          disabled={deleteTailButton.disabled}
          isLoader={deleteTailButton.isLoader}
          style={{ width: 175 }}
        />
      </div>
      <div className={styles.form__box}>
        <Input placeholder="Введите индекс" extraClass={styles.input__extra} />
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
          result.map((item, index) => <Circle letter={item} key={index} />)}
      </div>
    </SolutionLayout>
  );
};
