import { BinaryTree } from "./binaryTree.mjs";

class BinarySearchTree{
  constructor(rootNode = null){
    this.root = rootNode;
  }

  insert(data){
    if(this.root == null){
      this.root = new BinaryTree(data);
    }

    let parentNode = null;
    let currentNode = this.root;
    let newNode = null;

    // 터미널 노드를 만날때까지 값을 비교하면서 내려감
    while(currentNode != null){
      if(data == currentNode.getData()){ // 중복값은 무시
        return; // root노드가 설정되면 여기서 함수리턴
      }

      parentNode = currentNode;

      if(currentNode.getData() > data){ // 현재 노드가 더 크다면 왼쪽 노드를 참조
        currentNode = currentNode.getLeftSubTree();
      } else{ // 현재 노드가 더 작다면 오른쪽 노드 참조
        currentNode = currentNode.getRightSubTree();
      }
    } // while문을 끝내면 parentNode에는 삽입할 노드의 부모노드가 설정되어있음.


    // 그럼 자식을 만들어 작으면 왼쪽, 크면 오른쪽으로 삽입한다.
    newNode = new BinaryTree(data);
    if(parentNode.getData() > data){
      parentNode.setLeftSubTree(newNode);
    } else{
      parentNode.setRightSubTree(newNode);
    }
  }

  search(targetData){
    let currentNode = this.root;
    let currentData = null;

    while(currentNode != null){
      currentData = currentNode.getData();

      if(currentData == targetData){
        return currentNode;
      } else if(currentData > targetData){
        currentNode = currentNode.getLeftSubTree();
      } else{
        currentNode = currentNode.getRightSubTree();
      }
    }

    return null; // 트리를 다 뒤졌는데 없다면 null을 리턴
  }
}


let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(50);
binarySearchTree.insert(39);
binarySearchTree.insert(62);
binarySearchTree.insert(61);
binarySearchTree.insert(63);


console.log(binarySearchTree);
binarySearchTree.root.inOrderTraversal(binarySearchTree.root);
console.log("Search");
console.log(binarySearchTree.search(0));
