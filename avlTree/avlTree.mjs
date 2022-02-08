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

  Rotation(targetNode, data){
    let balanceFactor = this.getBalanceFactor(targetNode);
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
    return targetNode;
  }


  insert2(targetRootNode, data){
    if(targetRootNode == null){ // 기저조건
      targetRootNode = new BinaryTree(data);

      if(this.root == null){
        this.root = targetRootNode;
      }

      return targetRootNode;
    } else if(targetRootNode.data > data){
      targetRootNode.setLeftSubTree(this.insert2(targetRootNode.getLeftSubTree(), data));
    } else{
      targetRootNode.setRightSubTree(this.insert2(targetRootNode.getRightSubTree(), data));
    }

    targetRootNode.height = Math.max(this.getHeight(targetRootNode.getLeftSubTree()), this.getHeight(targetRootNode.getRightSubTree())) + 1;
    targetRootNode = this.Rotation(targetRootNode, data);

    return targetRootNode;
  }
}


let avlTree = new AVLTree();
avlTree.insert2(avlTree.root, 10);
avlTree.insert2(avlTree.root, 5);
avlTree.insert2(avlTree.root, 15);
avlTree.insert2(avlTree.root, 3);
avlTree.insert2(avlTree.root, 17);
avlTree.insert2(avlTree.root, 16);
console.log(avlTree.root);
avlTree.root.inOrderTraversal(avlTree.root);