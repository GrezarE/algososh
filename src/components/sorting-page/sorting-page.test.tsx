import React, { useState, useEffect } from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { SortedArray } from "typescript";
import { ElementStates } from "../../types/element-states";
// import { act } from "react-test-renderer";
import ReactDOM from "react-dom";
import { SortingArray } from "./sorting-page";
import { arrLength, createRandom } from "../../utils/utils";

interface IRandomObj {
  number: number;
  color: ElementStates;
}

const testingObj = [
  { number: 75, color: ElementStates.Default },
  { number: 21, color: ElementStates.Default },
  { number: 3, color: ElementStates.Default },
  { number: 99, color: ElementStates.Default },
];
const testingObjOne = [{ number: 99, color: ElementStates.Default }];

const Test = () => {
  const [randomArray, setRandomArray] = useState<IRandomObj[]>();

  const createRandomArr = (obj: any) => {
    setRandomArray(obj);
  };

  useEffect(() => {
    createRandomArr(testingObj);
  }, []);

  return (
    <SortingArray
      randomArray={randomArray}
      setRandomArray={setRandomArray}
      createRandomArr={createRandomArr}
    />
  );
};

describe("", () => {});

it("", async () => {
  jest.useFakeTimers();
  act(() => {
    render(<Test />);
  });

  const check: HTMLInputElement = screen.getByTestId("check");
  const bubble: HTMLInputElement = screen.getByTestId("bubble");
  const sortUp: HTMLButtonElement = screen.getByTestId("sort-up");
  const sortDown: HTMLButtonElement = screen.getByTestId("sort-down");
  await act(async () => {
    await fireEvent.click(bubble, { target: { check: true } });
  });

  await act(async () => {
    await fireEvent.click(sortUp);
  });
  // fireEvent.click(sortDown);

  // console.log(check.checked);
  // console.log(bubble.checked);
  await act(async () => {
    await jest.advanceTimersByTime(10000);
  });
  // act(() => jest.advanceTimersByTime(1000));

  const column = await screen.queryByTestId("Column_0");

  console.log(column?.textContent);
  expect(column?.textContent).toBe("3");
});
