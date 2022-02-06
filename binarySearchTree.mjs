import { BinaryTree } from "./binaryTree.mjs";

class BinarySearchTree{
  constructor(rootNode = null){
    this.root = rootNode;
  }

  insert(data){
    if(this.root == null){
      this.root = new BinaryTree(data);
	  return;
    }

    let parentNode = null;
    let currentNode = this.root;

    // 터미널 노드를 만날때까지 값을 비교하면서 내려감
    while(currentNode != null){
      parentNode = currentNode;

      if(currentNode.getData() > data){ // 현재 노드가 더 크다면 왼쪽 노드를 참조
        currentNode = currentNode.getLeftSubTree();
      } else{ // 현재 노드가 더 작다면 오른쪽 노드 참조
        currentNode = currentNode.getRightSubTree();
      }
    } // while문을 끝내면 parentNode에는 삽입할 노드의 부모노드가 설정되어있음.


    // 그럼 자식을 만들어 작으면 왼쪽, 크면 오른쪽으로 삽입한다.
    let newNode = new BinaryTree(data);
    if(parentNode.getData() > data){
      parentNode.setLeftSubTree(newNode);
    } else{
      parentNode.setRightSubTree(newNode);
    }
  }

  search(targetData){
    let currentNode = this.root;

    while(currentNode != null){

      if(currentNode.getData() == targetData){
        return currentNode;
      } else if(currentNode.getData() > targetData){
        currentNode = currentNode.getLeftSubTree();
      } else{
        currentNode = currentNode.getRightSubTree();
      }
    }

    return null; // 트리를 다 뒤졌는데 없다면 null을 리턴
  }

  remove(targetData){

    let fakeParentRootNode = new BinaryTree(0);
    let parentNode = fakeParentRootNode;
    let currentNode = this.root;
    let deletingNode = null;

    fakeParentRootNode.setRightSubTree(this.root);

    // 삭제할 노드를 찾는다.
    // while문이 끝나면 currentNode에는 삭제할 노드가 할당됨
    while(currentNode != null && currentNode.getData() != targetData){
      parentNode = currentNode;

      if(currentNode.getData() > targetData){
        currentNode = currentNode.getLeftSubTree();
      } else{
        currentNode = currentNode.getRightSubTree();
      }
    }

    // 삭제 대상을 못찾았을 때
    if(currentNode == null){
      return;
    }

    deletingNode = currentNode; // 현재 노드를 삭제대상으로 설정

    if(deletingNode.getLeftSubTree() == null && deletingNode.getRightSubTree() == null){ // 삭제할 노드가 단말 노드인 경우
      if(parentNode.getLeftSubTree() == deletingNode){
        parentNode.removeLeftSubTree();
      } else{
        parentNode.removeRightSubTree();
      }
    } else if(deletingNode.getLeftSubTree() == null || deletingNode.getRightSubTree() == null){ // 삭제할 노드가 하나의 자식 노드가 있는 경우
      let deletingNodeChild;

      if(deletingNode.getLeftSubTree() != null){ // 왼쪽 자식이 존재하는 경우
        deletingNodeChild = deletingNode.getLeftSubTree();
      } else{ // 오른쪽 자식이 존재하는 경우
        deletingNodeChild = deletingNode.getRightSubTree();
      }

      if(parentNode.getLeftSubTree() == deletingNode){ // 부모의 왼쪽자식이 삭제할 노드라면
        parentNode.setLeftSubTree(deletingNodeChild);
      } else{ // 부모의 오른쪽 자식이 삭제할 노드라면
        parentNode.setRightSubTree(deletingNodeChild);
      }
    } else{ //삭제할 노드가 두개의 자식노드를 가지고 있는 경우
      let replacingNode = deletingNode.getLeftSubTree(); // 대체할 노드(왼쪽에서 가장 큰 값을 찾기위해 먼저 왼쪽참조)
      let replacingNodeParent = deletingNode; // 대체 노드의 부모 노드


      // 가장 큰값을 찾기위해 오른쪽 끝까지 내려간다
      while(replacingNode.getRightSubTree() != null){
        replacingNodeParent = replacingNode;
        replacingNode = replacingNode.getRightSubTree();
      }

      let deletedNodeData = deletingNode.data;
      deletingNode.setData(replacingNode.data);

      // 대체할 노드의 연결을 끊어줌(자식만 연결)
      if(replacingNodeParent.getLeftSubTree() == replacingNode){
        replacingNodeParent.setLeftSubTree(replacingNode.getLeftSubTree());
      } else{
        replacingNodeParent.setRightSubTree(replacingNode.getLeftSubTree());
      }
      deletingNode = replacingNode;
      deletingNode.setData(deletedNodeData);
    }

    // 루트노드가 제거된 경우
    if(fakeParentRootNode.getRightSubTree() != this.root){
      this.root = fakeParentRootNode.getRightSubTree();

    }

    return deletingNode;
  }
}


let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(18);
binarySearchTree.insert(15);
binarySearchTree.insert(10);
binarySearchTree.insert(6);
binarySearchTree.insert(3);
binarySearchTree.insert(8);
binarySearchTree.insert(12);
binarySearchTree.insert(11);
binarySearchTree.insert(31);
binarySearchTree.insert(27);
binarySearchTree.insert(24);
binarySearchTree.insert(20);
binarySearchTree.insert(33);
binarySearchTree.insert(35);
binarySearchTree.insert(37);

binarySearchTree.root.inOrderTraversal(binarySearchTree.root);
console.log("========== Search 6 ==========");
console.log(binarySearchTree.search(6));
console.log("========== Search 1 ==========");
console.log(binarySearchTree.search(1));

//binarySearchTree.remove(50);
//binarySearchTree.root.inOrderTraversal(binarySearchTree.root);
