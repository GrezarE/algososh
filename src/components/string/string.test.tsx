import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StringPage } from "./string";

describe("Алгоритм разворота строки", () => {
  const stringTest = (
    valueString: string,
    resultTestFirst: string | undefined,
    resultTestSecond: string | undefined,
    test: string
  ) => {
    it(`Test ${test}`, async () => {
      jest.useFakeTimers();
      render(<StringPage />);

      const button: HTMLButtonElement = screen.getByTestId("button");
      const input: HTMLInputElement = screen.getByTestId("input");
      fireEvent.change(input, { target: { value: valueString } });

      fireEvent.click(button);

      jest.advanceTimersByTime(5000);

      const circle = screen.queryByTestId("Circle_0");
      const circle1 = screen.queryByTestId("Circle_1");

      await waitFor(() => {
        expect(circle?.textContent).toBe(resultTestFirst);
      });

      await waitFor(() => {
        expect(circle1?.textContent).toBe(resultTestSecond);
      });
    });
  };
  stringTest("12345", "5", "4", "with odd");
  stringTest("1234", "4", "3", "with even");
  stringTest("1", "1", undefined, "with one");
  stringTest("", undefined, undefined, "with zero");
});
