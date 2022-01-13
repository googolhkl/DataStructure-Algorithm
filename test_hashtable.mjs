import { HashTable } from "./HashTable.mjs";

let hashTable = new HashTable();

hashTable.set(1, "이운재"); // 1
hashTable.set(4, "최진철"); // 4
hashTable.set(20, "홍명보"); // 0
hashTable.set(6, "유상철"); // 6
hashTable.set(22, "송종국"); // 2
hashTable.set(21, "박지성"); // 1
hashTable.set(5, "김남일");  // 5
hashTable.set(10, "이영표"); // 0
hashTable.set(8, "최태욱"); // 8
hashTable.set(9, "설기현"); // 9
hashTable.set(14, "이천수"); // 4

console.log(`1: ${hashTable.get(1)}`);

hashTable.remove(1);
console.log(`1: ${hashTable.get(1)}`);
console.log(`21: ${hashTable.get(21)}`);
