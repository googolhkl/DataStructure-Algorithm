import { DoublyLinkedList } from "./DoublyLinkedList.mjs";

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
        return this.list.getNodeAt(this.list.count - 1);
    }

    isEmpty(){
        return (this.list.count == 0);
    }
}

export { Queue };
