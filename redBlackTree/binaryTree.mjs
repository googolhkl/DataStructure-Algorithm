const RED = false;
const BLACK = true;

class BinaryTree{
  constructor(data){
    this.data = data;

    this.left = null;
    this.right = null;
    this.parent = null;

    this.color = RED;
  }

  preOrderTraversal(tree){
    if(tree == null) return;

    console.log(tree.data);
    this.preOrderTraversal(tree.left);
    this.preOrderTraversal(tree.right);
  }

  inOrderTraversal(tree){
    if(tree == null) return;

    this.inOrderTraversal(tree.left);
    console.log(tree.data);
    this.inOrderTraversal(tree.right);

  }

  postOrderTraversal(tree){
    if(tree == null) return;

    this.postOrderTraversal(tree.left);
    this.postOrderTraversal(tree.right);
    console.log(tree.data);
  }
}

export { BinaryTree, RED, BLACK };
