import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Button } from "./button";

describe("Кнопка", () => {
  it("Кнопка без текста", () => {
    const button = render(<Button />);
    expect(button).toMatchSnapshot();
  });

  it("Кнопка с текстом", () => {
    const button = render(<Button text="Развернуть" />);
    expect(button).toMatchSnapshot();
  });

  it("Деактивированная кнопка", () => {
    const button = render(<Button disabled={true} />);
    expect(button).toMatchSnapshot();
  });

  it("Кнопка с индикацией загрузки", () => {
    const button = render(<Button isLoader={true} />);
    expect(button).toMatchSnapshot();
  });
});

describe("Нажатие на кнопку", () => {
  it("Проверяем корректность вызова колбека при клике на кнопку", () => {
    const buttonPress = jest.fn();
    render(<Button onClick={buttonPress} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(buttonPress).toHaveBeenCalled();
  });
});
