function insertionSort(arr){
  for(let i = 1; i < arr.length; i++){
    let insertingData = arr[i]; // 위치를 찾아갈 데이터
    let j;
    for(j = i - 1; j >= 0; j--){ // 정렬된 영역을 뒤에서부터 앞까지 순회
      if(arr[j] > insertingData){
        arr[j + 1] = arr[j]; //정렬된 데이터를 한칸뒤로 이동
      } else{
        break;
      }
    }
    arr[j + 1] = insertingData; // 정렬된 영역에서 insertingData보다 작은 값중에 가장 뒤에 삽입
  }
}

let arr = [4,1,5,3,6,2];

console.log("===== 정렬 전 =====");
console.log(arr);

insertionSort(arr);

console.log("===== 정렬 후 =====");
console.log(arr);
