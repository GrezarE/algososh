import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

it("Круг без буквы", () => {
  const circle = render(<Circle />);
  expect(circle).toMatchSnapshot();
});

it("Круг с буквами", () => {
  const circle = render(<Circle letter="Круг" />);
  expect(circle).toMatchSnapshot();
});

it("Круг с head", () => {
  const circle = render(<Circle head="head" />);
  expect(circle).toMatchSnapshot();
});

it("Круг react-элементом в head", () => {
  const circle = render(<Circle head={React.createElement("p")} />);
  expect(circle).toMatchSnapshot();
});

it("Круг c tail", () => {
  const circle = render(<Circle tail="tail" />);
  expect(circle).toMatchSnapshot();
});

it("Круг react-элементом в tail", () => {
  const circle = render(<Circle tail={React.createElement("div")} />);
  expect(circle).toMatchSnapshot();
});

it("Круг с index", () => {
  const circle = render(<Circle index={1} />);
  expect(circle).toMatchSnapshot();
});

it("Маленький круг", () => {
  const circle = render(<Circle isSmall={true} />);
  expect(circle).toMatchSnapshot();
});

it("Круг в состоянии базовом", () => {
  const circle = render(<Circle state={ElementStates.Default} />);
  expect(circle).toMatchSnapshot();
});

it("Круг в состоянии изменяемом", () => {
  const circle = render(<Circle state={ElementStates.Changing} />);
  expect(circle).toMatchSnapshot();
});

it("Круг в состоянии изменённом", () => {
  const circle = render(<Circle state={ElementStates.Modified} />);
  expect(circle).toMatchSnapshot();
});
