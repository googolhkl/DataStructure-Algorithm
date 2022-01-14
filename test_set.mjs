import { HashSet } from "./HashSet.mjs";

let hashSet = new HashSet();

console.log(`isEmpty: ${hashSet.isEmpty()}`);
console.log("===== 데이터 삽입 =====");
hashSet.add(1);
hashSet.add(1); // 중복 안됨
hashSet.add(123);
hashSet.add(512);
hashSet.printAll();
console.log(`isEmpty: ${hashSet.isEmpty()}`);


console.log("===== 데이터 1 제거 =====");
hashSet.remove(1);
hashSet.printAll();
console.log(`isEmpty: ${hashSet.isEmpty()}`);

console.log("===== clear =====");
hashSet.clear();
hashSet.printAll();
console.log(`isEmpty: ${hashSet.isEmpty()}`);
