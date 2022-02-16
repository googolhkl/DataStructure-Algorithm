import { BinaryTree, RED, BLACK } from "./binaryTree.mjs";

class NilNode extends BinaryTree{
  constructor(){
    super(0);
    this.color = BLACK;
  }

}
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


  // ---------------------- 삭제 ----------------------
  remove(data){
    let currentNode = this.root;

    while(currentNode != null && currentNode.data != data){
      if(data < currentNode.data){
        currentNode = currentNode.left;
      }else if(data > currentNode.data){
        currentNode = currentNode.right;
      }
    }

    if(currentNode == null){
      return;
    }

    // currentNode는 이제 삭제할 노드를 가리킴,없는 경우 함수 종료했음
    console.log(`삭제할 노드: ${currentNode.data}`);
    let replaceNode = null;
    let deletedNodeColor = RED;

    // 삭제할 노드의 자식이 0~1개일 때
    if(currentNode.left == null || currentNode.right == null){
      replaceNode = this.deleteNodeWithZeroOrOneChild(currentNode);
      deletedNodeColor = currentNode.color;
    }else{ // 삭제할 노드의 자식이 2개일 때
      let succesor = this.getMaximumNode(currentNode.left); // 대체할 노드는 왼쪽에서 가장 큰 값을 가져옴
      currentNode.data = succesor.data;
      replaceNode = this.deleteNodeWithZeroOrOneChild(succesor);
      deletedNodeColor = currentNode.color;
    }

    // 이까지하면 이진 탐색 트리처럼 삭제완료
    // 이제 삭제한 노드가 검은색인 경우 처리를 해줘야함
    if(deletedNodeColor == BLACK){
      this.fixRedBlackPropertiesAfterDelete(replaceNode);

      //임시로 만든 Nil노드 제거
      if(replaceNode instanceof NilNode){
        this.replaceParentsChild(replaceNode.parent, replaceNode, null);
      }
    }
  }

  deleteNodeWithZeroOrOneChild(node){
    if(node.left != null){ // 왼쪽 자식이 한 개 있는 경우
      this.replaceParentsChild(node.parent, node, node.left); // 부모의 왼쪽 자식노드를 삭제할 노드의 왼쪽 자식으로 연결
      return node.left;
    }else if(node.right != null){ // 오른쪽 자식이 한 개 있는 경우
      this.replaceParentsChild(node.parent, node, node.right); // 부모의 오른쪽 자식노드를 삭제할 노드의 오른쪽 자식으로 연결
      return node.right;
    }else{
      // 삭제할 노드가 빨간색이면 그냥 삭제
      // 삭제할 노드가 검은색이면 잠시 Nil노드 삽입
      let newChild = (node.color == BLACK) ? new NilNode() : null;
      this.replaceParentsChild(node.parent, node, newChild);
      return newChild;
    }
  }

  getMaximumNode(node){
    while(node.right != null){
      node = node.right;
    }
    return node;
  }

  fixRedBlackPropertiesAfterDelete(node){
    if(node == this.root){ // 대체한 노드가 루트노드인 경우 검은색으로만 바꿔주고 종료
      node.color = BLACK;
      return;
    }

    let sibling = this.getSibling(node);

    // 1.형제노드가 빨간색인 경우
    if(sibling.color == RED){
      this.handleRedSibling(node, sibling);
      sibling = this.getSibling(node); // 2~5번 상황에 걸릴 수도 있기 때문에 새로운 형제노드를 저장함
    }
    // 2,3,4,5. 형제노드가 검은색이고
    if(this.isBlack(sibling)){
      // 2,3. 형제의 두 자식노드가 검은색이고
      if(this.isBlack(sibling.left) && this.isBlack(sibling.right)){
        // 2. 부모 노드는 빨간색인 경우
        sibling.color = RED; // 2,3번 공통으로 형제의 색을 빨간색으로 변경
        if(node.parent.color == RED){
          node.parent.color = BLACK;
        }else{ // 3. 부모 노드는 검은색인 경우
          this.fixRedBlackPropertiesAfterDelete(node.parent);
        }
      }else{ //4,5. 형제의 두 자식중 하나라도 빨간색이고
        this.handleBlackSiblingWithAtLeastOneRedChild(node, sibling);
      }
    }
  }

  getSibling(node){
    let parent = node.parent;
    if(node == parent.left){
      return parent.right;
    }else if(node == parent.right){
      return parent.left;
    }
  }

  handleRedSibling(node, sibling){
    sibling.color = BLACK;
    node.parent.color = RED;
    
    if(node.parent.left == node){
      this.rotateLeft(node.parent);
    }else{
      this.rotateRight(node.parent);
    }
  }

  isBlack(node){
    return node == null || node.color == BLACK;
  }

  handleBlackSiblingWithAtLeastOneRedChild(node, sibling){
    let nodeIsLeftChild = (node.parent.left == node);

    // 4. 바깥쪽 조카가 검은색인 경우
    if(nodeIsLeftChild == true && this.isBlack(sibling.right)){ // 오른쪽트리의 바깥쪽 조카인 경우
      sibling.left.color = BLACK;
      sibling.color = RED;
      this.rotateRight(sibling);
      sibling = node.parent.right; // 5번 상황을 한번 더 거치기 위해서 설정
    }else if(nodeIsLeftChild == false && this.isBlack(sibling.left)){// 왼쪽트리의 바깥쪽 조카인 경우
      sibling.right.color = BLACK;
      sibling.color = RED;
      this.rotateLeft(sibling);
      sibling = node.parent.left; // 5번 상황을 한번 더 거치기 위해서 설정
    }

    // 5. 바깥쪽 조카가 빨간색인 경우
    sibling.color = node.parent.color;
    node.parent.color = BLACK;
    // 바깥쪽 조카의 색을 검정색으로
    if(nodeIsLeftChild){
      sibling.right.color = BLACK;
      this.rotateLeft(node.parent);
    }else{
      sibling.left.color = BLACK;
      this.rotateRight(node.parent);
    }
  }
}


let rbTree = new RedBlackTree();
rbTree.insert(17);
rbTree.insert(9);
rbTree.insert(19);
rbTree.insert(75);
rbTree.insert(81);


console.log(rbTree.root);
if(rbTree.root){
  rbTree.root.inOrderTraversal(rbTree.root);
}