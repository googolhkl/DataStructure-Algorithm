import { BinaryTree, RED, BLACK } from "./binaryTree.mjs";

class RedBlackTree{
  constructor(rootNode = null){
    this.root = rootNode;
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

  // --------------------- 삽입, 삭제에 필요한 함수들 -----------------------
  replaceParentsChild(parent, oldChild, newChild){
    if(parent == null){
      this.root = newChild;
    }else if(parent.left == oldChild){
      parent.left = newChild;
    }else if(parent.right == oldChild){
      parent.right = newChild;
    }

    if(newChild != null){
      newChild.parent = parent;
    }
  }

  rotateLeft(node){
    let parent = node.parent;
    let rightChild = node.right;

    node.right = rightChild.left;
    if (rightChild.left != null) {
      rightChild.left.parent = node;
    }

    rightChild.left = node;
    node.parent = rightChild;

    this.replaceParentsChild(parent, node, rightChild);
  }

  rotateRight(node){
    let parent = node.parent;
    let leftChild = node.left;

    node.left = leftChild.right;
    if (leftChild.right != null) {
      leftChild.right.parent = node;
    }

    leftChild.right = node;
    node.parent = leftChild;

    this.replaceParentsChild(parent, node, leftChild);
  }

  // ---------------------- 삽입 ----------------------
  insert(data){
    let current = this.root;
    let parent = null;

    // 삽입할 위치 찾기
    while(current != null){
      parent = current ;
      if(data < current.data){
        current = current.left;
      }else if(data > current.data){
        current = current.right;
      }else{
        return;
      }
    }

    // Binary Search Tree와 갈은 방법으로 새로운 노드 삽입
    let newNode = new BinaryTree(data);
    if(parent == null){
      this.root = newNode;
    } else if (data < parent.data){
      parent.left = newNode;
    }else{
      parent.right = newNode;
    }
    newNode.parent = parent;

    this.fixRedBlackPropertiesAfterInsert(newNode);
  }

  fixRedBlackPropertiesAfterInsert(node){
    let parent = node.parent;

    // 1. 새로운 노드가 루트노드인 경우
    if(parent == null){
      node.color = BLACK;
      return;
    }

    // 부모노드가 검은색 경우는 처리하지 않음.
    // 즉 이후로 실행되는 코드는 전부 부모노드가 빨간색임.
    if(parent.color == BLACK){ 
      return;
    }

    let grandParent = parent.parent;
    // 2. 새로운 노드의 부모노드가 루트노드이면서 빨간색인 경우
    // 할아버지가 없다는 뜻은 부모가 root노드라는 뜻
    if(grandParent == null){
      parent.color = BLACK;
      return;
    }

    // 3. 부모노드와 삼촌노드가 빨간색인 경우
    let uncle = this.getUncle(parent);
    if(uncle != null && uncle.color == RED){
      parent.color = BLACK;
      uncle.color = BLACK;
      grandParent.color = RED;
      
      this.fixRedBlackPropertiesAfterInsert(grandParent);
    }


    // 4. 부모노드는 빨간색이고 삼촌노드는 검은색이고 새로운 노드는 안쪽 손자인 경우
    else if(uncle == null || uncle.color == BLACK){
      if(grandParent.right == parent && parent.left == node){// 오른쪽의 안쪽 손자인 경우
        this.rotateRight(parent);
        this.rotateLeft(grandParent);
        node.color = BLACK;
        grandParent.color = RED;
      }else if(grandParent.left == parent && parent.right == node){// 왼쪽의 안쪽 손자인 경우
        this.rotateLeft(parent);
        this.rotateRight(grandParent);
        node.color = BLACK;
        grandParent.color = RED;
    // 5. 부모노드는 빨간색이고 삼촌노드는 검은색이고 새로운 노드는 바깥쪽 손자인 경우
      }else if(grandParent.right == parent && parent.right == node){ // 오른쪽의 바깥 손자인 경우
        this.rotateLeft(grandParent);
        parent.color = BLACK;
        grandParent.color = RED;
      }else if(grandParent.left == parent && parent.left == node){ // 왼쪽의 바깥 손자인 경우
        this.rotateRight(grandParent);
        parent.color = BLACK;
        grandParent.color = RED;
      }
    }
  }

  getUncle(parent){
    let grandParent = parent.parent;
    if(grandParent.left == parent){
      return grandParent.right;
    }else if(grandParent.right == parent){
      return grandParent.left;
    }

    return null; // NIL
  }

}


let rbTree = new RedBlackTree();
rbTree.insert(17);
rbTree.insert(19);
rbTree.insert(9);
rbTree.insert(75);
rbTree.insert(81);
console.log(rbTree.root);
rbTree.root.inOrderTraversal(rbTree.root);