function fibonacci1(n){
  if(n == 0 || n == 1) return n;
  return fibonacci1(n - 2) + fibonacci1(n - 1);
}

function fibonacci2(n, memo){
  if(n == 0 || n == 1) return n;

  if(memo[n] == null){
    memo[n] = fibonacci2(n - 2, memo) + fibonacci2(n - 1, memo);
  }
  return memo[n];
}

function fibonacci3(n){
  if(n == 0) return 0;

  let a = 0;
  let b = 1;

  for(let i = 1; i < n; i++){
    let temp = a;
    a = b;
    b = temp + a;
  }
  return b;
}

let start = new Date();
console.log(fibonacci1(40));
let end = new Date();
console.log(`fibonacci1 함수 실행시간: ${end - start}ms`);

start = new Date();
console.log(fibonacci2(40, {}));
end = new Date();
console.log(`fibonacci2 함수 실행시간: ${end - start}ms`);

start = new Date();
console.log(fibonacci3(40));
end = new Date();
console.log(`fibonacci3 함수 실행시간: ${end - start}ms`);
