interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    let array = this.container;
    array.push(item);
    this.container = array;
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.container.length < 1) {
      return null;
    }
    let size = this.getSize();
    return this.container[size - 1];
  };

  clear = () => {
    this.container = [];
  };

  getSize = () => this.container.length;

  getElements = () => this.container;
}
