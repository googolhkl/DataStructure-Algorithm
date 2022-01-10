import { Node, LinkedList } from './LinkedList.mjs';


let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);

node1.next = node2;
node2.next = node3;

let list = new LinkedList();

console.log("===== insertAt() 다섯 번 =====")
list.insertAt(0, 0);
list.insertAt(1, 1);
list.insertAt(2, 2);
list.insertAt(3, 3);
list.insertAt(4, 4);
list.printAll();
console.log(`count: ${list.count}\n`);

console.log("===== insertAt(2, 100) =====")
list.insertAt(2, 100);
list.printAll();
console.log(`count: ${list.count}\n`);

console.log("===== clear() =====")
list.clear();
list.printAll();
console.log(`count: ${list.count}\n`);

console.log("===== insertAt() 세 번 =====")
list.insertLast(0);
list.insertLast(1);
list.insertLast(2);
list.printAll();
console.log(`count: ${list.count}\n`);

console.log("===== deleteAt(1) =====")
list.deleteAt(1);
list.printAll();
console.log(`count: ${list.count}\n`);

console.log("===== deleteAt(0) =====")
list.deleteAt(0);
list.printAll();
console.log(`count: ${list.count}\n`);

console.log("===== insertAt(0, 5) =====")
list.insertAt(0, 5);
list.printAll();
console.log(`count: ${list.count}\n`);

console.log("===== deleteLast() 두 번 =====")
list.deleteLast();
list.deleteLast();
list.printAll();
console.log(`count: ${list.count}\n`);

console.log("===== insertAt() 다섯 번 =====")
list.insertAt(0, 0);
list.insertAt(1, 1);
list.insertAt(2, 2);
list.insertAt(3, 3);
list.insertAt(4, 4);
list.printAll();
console.log(`count: ${list.count}\n`);

let node = list.getNodeAt(4);
console.log(node.data)