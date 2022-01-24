import { DoublyLinkedList } from "./doublyLinkedList.mjs";

class Queue{
    constructor(){
        this.list = new DoublyLinkedList();
    }

    enqueue(data){
        this.list.insertAt(0, data);
    }

    dequeue(){
      return this.list.deleteLast();
    }

    front(){
        return this.list.tail;
    }

    isEmpty(){
        return (this.list.count == 0);
    }
}

export { Queue };
