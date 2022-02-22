import { Heap } from "./heap.mjs";

class PriorityQueue{
    constructor(){
        this.heap = new Heap();
        this.heap.isBigPriority = function(first, second){ // 내림차순으로 변경
            return (first > second);
        } 
    }

    enqueue(data){
        this.heap.insert(data);
    }

    dequeue(){
        return this.heap.remove();
    }
}

class MyData{
    constructor(data, rerserve1, priority){
        this.data = data;
        this.rerserve1 = rerserve1;
        this.priority = priority;
    }
}


let priorityQueue = new PriorityQueue();
priorityQueue.enqueue(new MyData("enemy1", undefined, 1000)); // 체력 내림차순으로
priorityQueue.enqueue(new MyData("enemy2", undefined, 900));

console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());