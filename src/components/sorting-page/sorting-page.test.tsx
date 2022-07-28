import React, { useState, useEffect } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ElementStates } from "../../types/element-states";
import { SortingArray } from "./sorting-page";

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
const zeroObj = undefined;

const Test = ({ testArray }: any) => {
  const [randomArray, setRandomArray] = useState<IRandomObj[] | undefined>(
    testArray
  );

  const createRandomArr = (obj: any) => {
    setRandomArray(obj);
  };

  useEffect(() => {
    createRandomArr(testArray);
    return () => {
      setRandomArray(undefined);
    };
  }, []);

  return (
    <SortingArray
      randomArray={randomArray}
      setRandomArray={setRandomArray}
      createRandomArr={createRandomArr}
    />
  );
};

describe("Сортировка", () => {
  it("Сортировка массива из 4 элементов пузырьком", async () => {
    jest.useFakeTimers();
    render(<Test testArray={testingObj} />);

    const check: HTMLInputElement = screen.getByTestId("check");
    const sortUp: HTMLButtonElement = screen.getByTestId("sort-up");
    fireEvent.click(check, { target: { check: true } });
    fireEvent.click(sortUp);
    jest.advanceTimersByTime(1000);
    const column0 = screen.queryByTestId("Column_0");
    const column1 = screen.queryByTestId("Column_1");
    const column2 = screen.queryByTestId("Column_2");
    const column3 = screen.queryByTestId("Column_3");
    await waitFor(() => {
      expect(column0?.textContent).toBe("3");
    });
    await waitFor(() => {
      expect(column1?.textContent).toBe("21");
    });
    await waitFor(() => {
      expect(column2?.textContent).toBe("75");
    });
    await waitFor(() => {
      expect(column3?.textContent).toBe("99");
    });
  });

  it("Сортировка массива из 4 элементов пузырьком", async () => {
    jest.useFakeTimers();
    const sort = render(<Test testArray={testingObj} />);

    const bubble: HTMLInputElement = screen.getByTestId("bubble");
    const sortUp: HTMLButtonElement = screen.getByTestId("sort-up");

    fireEvent.click(bubble, { target: { check: true } });
    fireEvent.click(sortUp);
    jest.advanceTimersByTime(1000);
    const column0 = screen.queryByTestId("Column_0");
    const column1 = screen.queryByTestId("Column_1");
    const column2 = screen.queryByTestId("Column_2");
    const column3 = screen.queryByTestId("Column_3");
    await waitFor(() => {
      expect(column0?.textContent).toBe("3");
    });
    await waitFor(() => {
      expect(column1?.textContent).toBe("21");
    });
    await waitFor(() => {
      expect(column2?.textContent).toBe("75");
    });
    await waitFor(() => {
      expect(column3?.textContent).toBe("99");
    });
  });

  it("Сортировка массива из одного элемента пузырьком", async () => {
    jest.useFakeTimers();
    const sort = render(<Test testArray={testingObjOne} />);
    const bubble: HTMLInputElement = screen.getByTestId("bubble");
    const sortUp: HTMLButtonElement = screen.getByTestId("sort-up");
    fireEvent.click(bubble, { target: { check: true } });
    fireEvent.click(sortUp);
    jest.advanceTimersByTime(1000);
    const column0 = screen.queryByTestId("Column_0");
    await waitFor(() => {
      expect(column0?.textContent).toBe("99");
    });
  });

  it("Сортировка массива из одного элемента выбором", async () => {
    jest.useFakeTimers();
    const sort = render(<Test testArray={testingObjOne} />);
    const check: HTMLInputElement = screen.getByTestId("check");

    const sortUp: HTMLButtonElement = screen.getByTestId("sort-up");
    fireEvent.click(check, { target: { check: true } });
    fireEvent.click(sortUp);
    jest.advanceTimersByTime(1000);
    const column0 = screen.queryByTestId("Column_0");
    await waitFor(() => {
      expect(column0?.textContent).toBe("99");
    });
  });

  it("Сортировка пустого массива", async () => {
    jest.useFakeTimers();
    const sort = render(<Test testArray={zeroObj} />);
    const check: HTMLInputElement = screen.getByTestId("check");

    const sortUp: HTMLButtonElement = screen.getByTestId("sort-up");
    fireEvent.click(check, { target: { check: true } });
    fireEvent.click(sortUp);
    jest.advanceTimersByTime(1000);
    const column0 = screen.queryByTestId("Column_0");
    await waitFor(() => {
      expect(column0?.textContent).toBe(undefined);
    });
  });
});
