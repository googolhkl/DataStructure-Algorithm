import { Heap } from "./heap.mjs";

class PriorityQueue{
    constructor(){
        this.heap = new Heap();
        this.heap.isBigPriority = function(first, second){ // 체력 높은게 우선순위 높음
            return (first.priority > second.priority);
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
priorityQueue.enqueue(new MyData("enemy2", undefined, 2000)); // 체력 내림차순으로
priorityQueue.enqueue(new MyData("enemy3", undefined, 900));
priorityQueue.enqueue(new MyData("enemy4", undefined, 5000));

console.log(priorityQueue.heap.root);
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());