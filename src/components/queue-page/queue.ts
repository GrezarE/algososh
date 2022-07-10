interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  setClear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(null);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    if (this.tail === this.size) {
      this.tail = 0;
      this.container[this.tail] = item;
      this.tail++;
    } else {
      this.container[this.tail] = item;
      this.tail++;
    }
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    if (this.head === this.size) {
      this.head = 0;
      this.container[this.head] = null;
      this.head++;
    } else {
      this.container[this.head] = null;
      this.head++;
    }
    this.length--;
  };

  setClear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array(this.size).fill(null);
    // this.container[0] = null;
    // this.tail = 0;
    // this.container[this.tail] = null;
    // this.tail++;
    console.log(this.container);
  };

  getElements() {
    return this.container;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  getLength() {
    return this.length;
  }

  getSize() {
    return this.size
  }

  isEmpty = () => this.length === 0;
}
