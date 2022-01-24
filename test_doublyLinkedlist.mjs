import { Node, DoublyLinkedList } from './doublyLinkedList.mjs';

let list = new DoublyLinkedList();

console.log("===== insertAt() 다섯 번 =====")
list.insertAt(0, 0);
list.insertAt(1, 1);
list.insertAt(2, 2);
list.insertAt(3, 3);
list.insertAt(4, 4);
list.printAll();
console.log(`count: ${list.count}\n`);

let node = list.getNodeAt(2);
console.log("getNodeAt(2)");
console.log(`node.data: ${node.data}`); // 2
console.log(`node.prev.data: ${node.prev.data}`); // 1
console.log(`node.prev.prev.data: ${node.prev.prev.data}`); // 0
console.log(`node.next.data: ${node.next.data}`); // 3
console.log(`node.next.next.data: ${node.next.next.data}`); // 4

console.log("\n===== deleteAt(0) =====")
console.log("deleteAt(0)");
list.deleteAt(0);
console.log("getNodeAt(0)");
node = list.getNodeAt(0);
console.log(`node.data: ${node.data}`); // 2
list.printAll();
console.log(`count: ${list.count}\n`);

console.log("===== deleteAt(3) =====")
list.deleteAt(3);
list.printAll();
console.log(`count: ${list.count}\n`);
node = list.getNodeAt(2);
console.log("getNodeAt(2)");
console.log(`node.data: ${node.data}`); // 1
console.log(`node.prev.data: ${node.prev.data}`); // 1
console.log(`node.prev.prev.data: ${node.prev.prev.data}`); // 1


console.log(list.tail);
list.deleteAt(2);
console.log(list.tail);
list.printAll();
console.log(list.count);
