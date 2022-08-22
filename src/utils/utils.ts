import { ElementStates } from "../types/element-states";

export const arrLength = () => {
  const arrLength = Math.floor(Math.random() * (17 - 3) + 3);
  return arrLength;
};

export const createRandom = (length: number) => {
  // const arrLength = Math.floor(Math.random() * (17 - 3) + 3);
  const rArray = Array.from({ length: length }, () =>
    Math.floor(Math.random() * 100)
  );
  const rObj = rArray.map((item) => {
    return { color: ElementStates.Default, number: item };
  });
  return rObj;
};
