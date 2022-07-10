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
    console.log(this.container);
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

const st = new Stack<string>();
st.push("прив");
st.push("как");
st.push("сам?");
st.pop();
console.log(st.peak()); // как
st.push("дела?");
console.log(st.peak()); // дела?
