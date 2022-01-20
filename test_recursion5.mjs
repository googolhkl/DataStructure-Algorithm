function hanoi(count, from, to, by){
  if(count == 0) return;
  hanoi(count - 1, from, by, to);
  console.log(`원반${count}를 ${from}에서 ${to}로 이동`);
  hanoi(count - 1, by, to, from);
}

hanoi(3, "A", "C", "B");
