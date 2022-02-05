function binarySearch(arr, target, start, end){
  if(start > end){
    return null;
  }

  let mid = Math.floor((start + end) / 2);

  if(arr[mid] == target){
    return mid;
  } else if(arr[mid] < target){
    return binarySearch(arr, target, mid + 1, end);
  } else {
    return binarySearch(arr, target, start, mid - 1);
  }
}

function binarySearch2(arr, target, start, end){
  while(start <= end){
    let mid = Math.floor((start + end) / 2);

    if(arr[mid] == target){
      return mid;
    } else if(arr[mid] < target){
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return null;
}


let arr = [1,3,4,5,6,7,8,9,10];
let index = binarySearch(arr, 3, 0, arr.length - 1);
console.log(`index: ${index}`);
