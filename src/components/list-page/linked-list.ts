export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteHead?: () => void;
  deleteTail?: () => void;
  deleteByIndex?: (position: number) => void;
  addByIndex: (element: T, position: number) => void;
  getSize: () => number;
  toArray: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        for (let i = 1; i < index; i++) {
          if (curr) {
            curr = curr.next;
          }
        }
        if (curr) {
          node.next = curr.next;
          curr.next = node;
        }
      }
      this.size++;
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  deleteHead() {
    if (this.size === 1) {
      this.head = null;
    } else {
      let current = this.head?.next;
      this.head = current || null;
    }
    this.size--;
  }

  deleteTail() {
    let current = this.head;
    let prev = new Node<any>(0);
    if (this.size === 1) {
      this.head = null;
    } else {
      for (let i = 1; i <= this.size; ++i) {
        if (current?.next) {
          prev = current;
          current = current.next;
        } else {
          current = prev;
          current.next = null;
        }
      }
    }
    this.size--;
  }

  deleteByIndex(position: number) {
    let current = this.head;
    let prev: Node<any> | null = new Node(0);
    if (position < 0 || position > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      if (this.size === 1) {
        this.head = null;
      } else {
        for (let i = 0; i < position; i++) {
          if (!current?.next) {
            current = prev;
            current.next = null;
          }
          prev = current;
          current = current.next;
          console.log(this.head);
        }

        prev.next = current ? current.next : null;
      }
    }
    this.size--;
  }

  getSize() {
    return this.size;
  }

  toArray() {
    let curr = this.head;
    let arr: any[] = [];
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }
}
