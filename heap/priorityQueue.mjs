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
priorityQueue.enqueue(new MyData("enemy1", undefined, 100)); // 체력 내림차순으로
priorityQueue.enqueue(new MyData("enemy2", undefined, 80)); // 체력 내림차순으로
priorityQueue.enqueue(new MyData("enemy3", undefined, 70));
priorityQueue.enqueue(new MyData("enemy4", undefined, 50));
priorityQueue.enqueue(new MyData("enemy4", undefined, 60));
priorityQueue.enqueue(new MyData("enemy4", undefined, 62));
priorityQueue.enqueue(new MyData("enemy4", undefined, 68));
priorityQueue.enqueue(new MyData("enemy4", undefined, 48));
priorityQueue.enqueue(new MyData("enemy4", undefined, 45));
priorityQueue.enqueue(new MyData("enemy4", undefined, 55));
priorityQueue.enqueue(new MyData("enemy4", undefined, 59));
priorityQueue.enqueue(new MyData("enemy4", undefined, 40));
priorityQueue.enqueue(new MyData("enemy4", undefined, 42));
priorityQueue.enqueue(new MyData("enemy4", undefined, 63));
priorityQueue.enqueue(new MyData("enemy4", undefined, 64));
priorityQueue.enqueue(new MyData("enemy4", undefined, 30));
priorityQueue.enqueue(new MyData("enemy4", undefined, 35));
priorityQueue.enqueue(new MyData("enemy4", undefined, 10));
priorityQueue.enqueue(new MyData("enemy4", undefined, 20));
priorityQueue.enqueue(new MyData("enemy4", undefined, 47));
priorityQueue.enqueue(new MyData("enemy4", undefined, 48));
priorityQueue.enqueue(new MyData("enemy4", undefined, 55));
priorityQueue.enqueue(new MyData("enemy4", undefined, 57));
priorityQueue.enqueue(new MyData("enemy4", undefined, 33));


//console.log(priorityQueue.heap.root);
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());