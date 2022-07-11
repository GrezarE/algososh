import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";

interface IRandomObj {
  number: number;
  color: ElementStates;
}

export const SortingPage: React.FC = () => {
  const [randomArray, setRandomArray] = useState<IRandomObj[]>();
  const [checked, setChecked] = useState("check");
  const [createButton, setCreateButton] = useState({
    isLoader: false,
    disabled: false,
  });
  const [ascendingButton, setAscendingButton] = useState({
    isLoader: false,
    disabled: false,
  });
  const [descendingButton, setDescendingButton] = useState({
    isLoader: false,
    disabled: false,
  });

  const createRandomArr = () => {
    const arrLength = Math.floor(Math.random() * (17 - 3) + 3);
    const rArray = Array.from({ length: arrLength }, () =>
      Math.floor(Math.random() * 100)
    );
    const rObj = rArray.map((item) => {
      return { color: ElementStates.Default, number: item };
    });
    setRandomArray(rObj);
  };

  const bubbleSort = async (arr: IRandomObj[], simbol: string) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        setRandomArray([...arr]);
        await new Promise((resolve: any) =>
          setTimeout(() => {
            resolve();
          }, 250)
        );
        if (simbol === "Ascending") {
          if (arr[j].number > arr[j + 1].number) {
            let temp = arr[j].number;
            arr[j].number = arr[j + 1].number;
            arr[j + 1].number = temp;
          }
        } else {
          if (arr[j].number < arr[j + 1].number) {
            let temp = arr[j].number;
            arr[j].number = arr[j + 1].number;
            arr[j + 1].number = temp;
          }
        }

        arr[j].color = ElementStates.Default;
        arr[j + 1].color = ElementStates.Default;
        setRandomArray([...arr]);
      }
      arr[arr.length - i - 1].color = ElementStates.Modified;
      setRandomArray([...arr]);
    }
  };

  const selectionSort = async (arr: IRandomObj[], simbol: string) => {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      let min = i;
      for (let j = i; j < n; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setRandomArray([...arr]);
        await new Promise((resolve: any) =>
          setTimeout(() => {
            resolve();
          }, 250)
        );
        if (simbol === "Ascending") {
          if (arr[j].number < arr[min].number) {
            min = j;
          }
        } else {
          if (arr[j].number > arr[min].number) {
            min = j;
          }
        }

        arr[j].color = ElementStates.Default;
        setRandomArray([...arr]);
      }
      if (min !== i) {
        let tmp = arr[i].number;
        arr[i].number = arr[min].number;
        arr[min].number = tmp;
      }
      arr[i].color = ElementStates.Modified;
      setRandomArray([...arr]);
    }
    console.log(arr);
  };

  const onSortAscending = async () => {
    if (!randomArray) {
      return;
    }
    setAscendingButton({ isLoader: true, disabled: false });
    setDescendingButton({ isLoader: false, disabled: true });
    setCreateButton({ ...createButton, disabled: true });
    if (checked === "bubble") {
      await bubbleSort(randomArray, "Ascending");
      setAscendingButton({ isLoader: false, disabled: false });
      setDescendingButton({ isLoader: false, disabled: false });
      setCreateButton({ ...createButton, disabled: false });
    } else {
      await selectionSort(randomArray, "Ascending");
      setAscendingButton({ isLoader: false, disabled: false });
      setDescendingButton({ isLoader: false, disabled: false });
      setCreateButton({ ...createButton, disabled: false });
    }
  };
  const onSortDescending = async () => {
    if (!randomArray) {
      return;
    }
    setAscendingButton({ isLoader: false, disabled: true });
    setDescendingButton({ isLoader: true, disabled: false });
    setCreateButton({ ...createButton, disabled: true });
    if (checked === "bubble") {
      await bubbleSort(randomArray, "Descending");
      setAscendingButton({ isLoader: false, disabled: false });
      setDescendingButton({ isLoader: false, disabled: false });
      setCreateButton({ ...createButton, disabled: false });
    } else {
      await selectionSort(randomArray, "Descending");
      setAscendingButton({ isLoader: false, disabled: false });
      setDescendingButton({ isLoader: false, disabled: false });
      setCreateButton({ ...createButton, disabled: false });
    }
  };
  const onChangeRadio = (value: string) => {
    setChecked(value);
  };

  useEffect(() => {
    createRandomArr();
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.box}>
        <form className={styles.form__box}>
          <RadioInput
            label="Выбор"
            name="sort"
            value="check"
            onChange={() => onChangeRadio("check")}
            defaultChecked
          />
          <RadioInput
            label="Пузырёк"
            name="sort"
            value="bubble"
            onChange={() => onChangeRadio("bubble")}
          />
        </form>
        <div className={styles.buttons__box}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            style={{ width: 205 }}
            onClick={onSortAscending}
            disabled={ascendingButton.disabled}
            isLoader={ascendingButton.isLoader}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            style={{ width: 205 }}
            onClick={onSortDescending}
            disabled={descendingButton.disabled}
            isLoader={descendingButton.isLoader}
          />
        </div>
        <Button
          text="Новый массив"
          style={{ width: 205 }}
          onClick={createRandomArr}
          disabled={createButton.disabled}
          isLoader={createButton.isLoader}
        />
      </div>
      <div className={styles.column__box}>
        {randomArray &&
          randomArray.map((item, index) => (
            <Column index={item.number} key={index} state={item.color} />
          ))}
      </div>
    </SolutionLayout>
  );
};
