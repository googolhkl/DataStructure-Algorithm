function mergeSort(arr, leftIndex, rightIndex){

  if(leftIndex < rightIndex){ // left가 작으면 더 나눌수 있는 상태
    let midIndex = parseInt((leftIndex + rightIndex) / 2); // 배열을 중간 인덱스

    // 재귀적으로 동작하는 부분
    mergeSort(arr, leftIndex, midIndex); // 왼쪽 범위 정렬
    mergeSort(arr, midIndex + 1, rightIndex); // 오른쪽 범위 정렬
    merge(arr, leftIndex, midIndex, rightIndex); // 정렬된 왼쪽과 오른쪽 범위를 합쳐준다.
  }
}

function merge(arr, leftIndex, midIndex, rightIndex){
  let leftAreaIndex = leftIndex;
  let rightAreaIndex = midIndex + 1;

  // 원본 배열과 똑같은 길이의 배열을 만들고 0으로 초기화
  let tempArr = [];
  tempArr.length = rightIndex + 1;
  tempArr.fill(0, 0, rightIndex + 1);

  let tempArrIndex = leftIndex;

  // 왼쪽영역이나 오른쪽 영역을 비교하면서 tempArr에 합침
  while(leftAreaIndex <= midIndex && rightAreaIndex <= rightIndex){ // 왼쪽 영역의 끝까지 가거나 오른쪽 영역의 끝까지 갈때 까지 반복
    if(arr[leftAreaIndex] <= arr[rightAreaIndex]){ // 왼쪽 영역의 데이터가 오른쪽 영역의 데이터보다 크다면
      tempArr[tempArrIndex] = arr[leftAreaIndex++]; // 왼쪽 영역의 데이터를 tempArr에 넣어주고 왼쪽 영역의 현재 인덱스를 1 늘림
    } else { // 그렇지 않다면
      tempArr[tempArrIndex] = arr[rightAreaIndex++]; // 오른쪽쪽 영역의 데이터를 tempArr에 넣어주고 오른쪽쪽 영역의 현재 인덱스를 1 늘림
    }
    tempArrIndex++; // tempArr에 데이터가 들어왔으니 한칸 오른쪽으로 이동시켜줌
  }


  if(leftAreaIndex > midIndex){ // 만약 왼쪽 영역이 남아있다면
    for(let i = rightAreaIndex; i <= rightIndex; i++){ // for문을 돌면서 왼쪽영역 나머지 전부 tempArr에 넣어줌
      tempArr[tempArrIndex++] = arr[i];
    }
  } else { // 오른쪽 영역이 남아있다면
    for(let i = leftAreaIndex; i <= midIndex; i++){ // for문을 돌면서 오른쪽영역 나머지 전부 tempArr에 넣어줌
      tempArr[tempArrIndex++] = arr[i];
    }
  }

  for(let i = leftIndex; i <= rightIndex; i++){ // tempArr에 있는 데이터를 전부 arr로 복사
    arr[i] = tempArr[i];
  }
}

let arr = [3,5,2,4,1,7,8,6];

console.log("===== 정렬 전 =====");
console.log(arr);
mergeSort(arr, 0, arr.length - 1);
console.log("===== 정렬 후 =====");
console.log(arr);
