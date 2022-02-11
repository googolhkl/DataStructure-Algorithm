import { BinaryTree } from "./binaryTree.mjs";

class AVLTree{
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

  getHeight(node){
    if(node == null){
      return 0;
    }else{
      return node.height;
    }
  }

  getBalanceFactor(node){
    return this.getHeight(node.getLeftSubTree()) - this.getHeight(node.getRightSubTree());
  }

  rotateLeft(node){
    let childNode = node.getRightSubTree(); // 2
    node.setRightSubTree(childNode.getLeftSubTree()); 
    childNode.setLeftSubTree(node);

    // 높이 재설정
    node.height = Math.max(this.getHeight(node.getLeftSubTree()), this.getHeight(node.getRightSubTree())) + 1;
    childNode.height = Math.max(this.getHeight(childNode.getLeftSubTree()), this.getHeight(childNode.getRightSubTree())) + 1;
    return childNode; // 자식 노드가 부모가 됐기 때문에 자식노드를 리턴
  }

  rotateRight(node){
    let childNode = node.getLeftSubTree(); // 2
    node.setLeftSubTree(childNode.getRightSubTree());
    childNode.setRightSubTree(node);

    // 높이 재설정
    node.height = Math.max(this.getHeight(node.getLeftSubTree()), this.getHeight(node.getRightSubTree())) + 1;
    childNode.height = Math.max(this.getHeight(childNode.getLeftSubTree()), this.getHeight(childNode.getRightSubTree())) + 1;
    return childNode; // 자식 노드가 부모가 됐기 때문에 자식노드를 리턴
  }

  rotation(targetNode, data){
    let balanceFactor = this.getBalanceFactor(targetNode);
    let isRootNode = false;
    if(targetNode == this.root){
      isRootNode = true;
    }

    if(balanceFactor < -1 && data > targetNode.getRightSubTree().getData()){ // LL회전
      targetNode = this.rotateLeft(targetNode);
    } else if(balanceFactor > 1 && data < targetNode.getLeftSubTree().getData()){ // RR회전
      targetNode = this.rotateRight(targetNode);
    } else if(balanceFactor > 1 && data > targetNode.getLeftSubTree().getData()){ // LR회전
      targetNode.setLeftSubTree(this.rotateLeft(targetNode.getLeftSubTree()));
      targetNode = this.rotateRight(targetNode);
    } else if(balanceFactor < -1 && data < targetNode.getRightSubTree().getData()){ // RL회전
      targetNode.setRightSubTree(this.rotateRight(targetNode.getRightSubTree()));
      targetNode = this.rotateLeft(targetNode);
    }

    if(isRootNode){
      this.root = targetNode;
    }

    return targetNode;
  }


  insert(targetRootNode, data){
    if(targetRootNode == null){ // 기저조건
      targetRootNode = new BinaryTree(data);

      if(this.root == null){
        this.root = targetRootNode;
      }

      return targetRootNode;
    }else if(targetRootNode.data == data){
      return targetRootNode;
    }else if(targetRootNode.data > data){
      targetRootNode.setLeftSubTree(this.insert(targetRootNode.getLeftSubTree(), data));
    } else{
      targetRootNode.setRightSubTree(this.insert(targetRootNode.getRightSubTree(), data));
    }

    targetRootNode.height = Math.max(this.getHeight(targetRootNode.getLeftSubTree()), this.getHeight(targetRootNode.getRightSubTree())) + 1;
    targetRootNode = this.rotation(targetRootNode, data);

    return targetRootNode;
  }

  remove(targetRootNode, data, parentNode = null){
    if(targetRootNode.getData() > data && targetRootNode.getLeftSubTree() != null){
      targetRootNode.setLeftSubTree(this.remove(targetRootNode.getLeftSubTree(), data, targetRootNode));
    }else if(targetRootNode.getData() < data && targetRootNode.getRightSubTree() != null){
      targetRootNode.setRightSubTree(this.remove(targetRootNode.getRightSubTree(), data, targetRootNode));
    }else if(targetRootNode.getData() == data){
      return this.removeHelper(targetRootNode, data, parentNode);
    }

    targetRootNode.height = Math.max(this.getHeight(targetRootNode.getLeftSubTree()), this.getHeight(targetRootNode.getRightSubTree())) + 1;

    data = (targetRootNode.getData() > data) ? Infinity : -Infinity;

    targetRootNode = this.rotation(targetRootNode, data);

    return targetRootNode;
  }

  removeHelper(deletingNode, data, parentNode){
    let fakeParentRootNode = new BinaryTree(0);
    fakeParentRootNode.setRightSubTree(this.root);

    let deletingNodeChild = null;

    if(deletingNode.getLeftSubTree() == null && deletingNode.getRightSubTree() == null){ // 삭제할 노드가 단말 노드인 경우
      if(parentNode.getLeftSubTree() == deletingNode){
        parentNode.removeLeftSubTree();
      } else{
        parentNode.removeRightSubTree();
      }
    } else if(deletingNode.getLeftSubTree() == null || deletingNode.getRightSubTree() == null){ // 삭제할 노드가 하나의 자식 노드가 있는 경우

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
      deletingNodeChild = deletingNode;
    }

    if(fakeParentRootNode.getRightSubTree() != this.root){
      this.root = fakeParentRootNode.getRightSubTree();
    }

    return deletingNodeChild;
  }
}


let avlTree = new AVLTree();
avlTree.insert(avlTree.root, 1);
avlTree.insert(avlTree.root, 2);
avlTree.insert(avlTree.root, 3);
avlTree.insert(avlTree.root, 4);
avlTree.insert(avlTree.root, 5);
avlTree.insert(avlTree.root, 7);
avlTree.insert(avlTree.root, 8);
avlTree.root.inOrderTraversal(avlTree.root);
console.log("============================= remove =============================");

avlTree.remove(avlTree.root, 2);
avlTree.remove(avlTree.root, 3);
avlTree.remove(avlTree.root, 1);

console.log(avlTree.root);
avlTree.root.inOrderTraversal(avlTree.root);
console.log(avlTree.search(7));