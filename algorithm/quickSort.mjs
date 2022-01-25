function quickSort(arr, left, right) {
  if(left <= right){
    let pivot = divide(arr, left, right);
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
  }
}

function divide(arr, left, right){
  let pivot = arr[left]; // 간단하게 피봇은 가장 왼쪽의 값으로 설정
  let leftStartIndex = left + 1;
  let rightStartIndex = right;

  while(leftStartIndex <= rightStartIndex){
    while(pivot >= arr[leftStartIndex] && leftStartIndex <= right){ // 왼쪽에서 시작해 pivot보다 큰 값의 인덱스 찾기
      leftStartIndex++;
    }

    while(pivot <= arr[rightStartIndex] && rightStartIndex >= (left + 1)){ // 오른쪽에서 시작해 pivot보다 작은 값은 인덱스 찾기
      rightStartIndex--;
    }

    if(leftStartIndex <= rightStartIndex){ // 왼쪽에 pivot보다 큰 값과 오른쪽에 pivot보다 작은 값 위치변경
      swap(arr, leftStartIndex, rightStartIndex);
    }
  }

  swap(arr, left, rightStartIndex); // pivot의 값과 rightStartIndex의 값의 위치 변경
  return rightStartIndex;
}

function swap(arr, index1, index2){
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

let arr = [5,3,7,2,6,4,9,1,8];

console.log("===== 정렬 전 =====");
console.log(arr);

quickSort(arr, 0, arr.length - 1);

console.log("===== 정렬 후 =====");
console.log(arr);
