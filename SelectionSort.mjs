function SelectionSort(arr){
  for(let i = 0; i < arr.length - 1; i++){
    let minValueIndex = i; // 가장 작은 값이 들어있는 배열의 인덱스
    for(let j = i + 1; j < arr.length; j++){ // 정렬된 인덱스를 제외한 범위에서 가장 작은 값이 들어있는 인덱스 찾기
      if(arr[j] < arr[minValueIndex]){
        minValueIndex = j;
      }
    }

    // 이미 정렬된 숫자를 제외한 가장 앞에있는 인덱스에 가장 작은 값이오도록 교체
    let temp = arr[i];
    arr[i] = arr[minValueIndex];
    arr[minValueIndex] = temp;
  }
}


let arr = [4,2,1,3];

console.log("===== 정렬 전 =====");
console.log(arr);

SelectionSort(arr);

console.log("===== 정렬 후 =====");
console.log(arr);
