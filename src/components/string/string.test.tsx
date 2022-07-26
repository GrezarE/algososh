import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StringPage } from "./string";
import { ElementStates } from "../../types/element-states";
import { act } from "react-test-renderer";

const evenResult = [
  { color: ElementStates.Modified, letter: 4 },
  { color: ElementStates.Modified, letter: 3 },
  { color: ElementStates.Modified, letter: 2 },
  { color: ElementStates.Modified, letter: 1 },
];
const oddResult = [
  { color: ElementStates.Modified, letter: 3 },
  { color: ElementStates.Modified, letter: 2 },
  { color: ElementStates.Modified, letter: 1 },
];
const oneResult = [{ color: ElementStates.Modified, letter: 1 }];

it("Test", async () => {
  jest.useFakeTimers();
  render(<StringPage />);

  const button: HTMLButtonElement = screen.getByTestId("button");
  const input: HTMLInputElement = screen.getByTestId("input");
  // act(() => {
  fireEvent.change(input, { target: { value: "1234567" } });
  // });

  // await act(async () => {
  await fireEvent.click(button);
  // });

  // console.log(screen.queryByTestId("Circle_0")?.textContent);
  await jest.advanceTimersByTime(5000);

  // act(() => {
  console.log(screen.getByTestId("Circle_0")?.textContent);
  // });
});
