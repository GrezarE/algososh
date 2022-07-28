import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { StringPage } from "./string";
import { ElementStates } from "../../types/element-states";

// describe("Алгоритм разворота строки", () => {
//   const stringTest = (
//     valueString: string,
//     resultTest: string | undefined,
//     test: string
//   ) => {
//     it(`Test ${test}`, async () => {
//       jest.useFakeTimers();
//       render(<StringPage />);

//       const button: HTMLButtonElement = screen.getByTestId("button");
//       const input: HTMLInputElement = screen.getByTestId("input");
//       fireEvent.change(input, { target: { value: valueString } });

//       fireEvent.click(button);

//       jest.advanceTimersByTime(5000);

//       expect(screen?.queryByTestId("Circle_0")?.textContent).toBe(resultTest);
//     });
//   };
//   stringTest("12345", "5", "with odd");
//   stringTest("123456", "6", "with even");
//   stringTest("1", "1", "with one");
//   stringTest("", undefined, "with zero");
// });

it("Test", async () => {
  jest.useFakeTimers();
  render(<StringPage />);
  const button: HTMLButtonElement = screen.getByTestId("button");
  const input: HTMLInputElement = screen.getByTestId("input");
  fireEvent.change(input, { target: { value: "1234567" } });

  fireEvent.click(button);

  jest.advanceTimersByTime(5000);
  const circle = screen.queryByTestId("Circle_0");
  const circle1 = screen.queryByTestId("Circle_4");

  await waitFor(() => {
    expect(circle?.textContent).toBe("7");
  });
  await waitFor(() => {
    expect(circle1?.textContent).toBe("3");
  });
});
