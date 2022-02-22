import { BinaryTree } from "./binaryTree.mjs";

class Heap{
    constructor(rootNode = null){
        this.root = null;
        this.lastInsertedNode = null;
    }

    insert(data){
        if(this.lastInsertedNode == null){ // 처음 삽입할 때
            this.lastInsertedNode = new BinaryTree(data);
            this.root = this.lastInsertedNode;
            return;
        }

        // 트리의 가장 마지막에 데이터를 삽입한다.
        let insertingParent = this.getInsertingParent();
        let newNode = new BinaryTree(data);
        if(insertingParent.left == null){
            insertingParent.left = newNode;
            newNode.parent = insertingParent;
            this.lastInsertedNode = newNode;
        }else if(insertingParent.right == null){
            insertingParent.right = newNode;
            newNode.parent = insertingParent;
           this.lastInsertedNode = newNode;
        }

        // 새로 삽입한 노드를 우선순위찾아가게하기
        while(newNode.parent != null){
            if(this.isBigPriority(newNode.data, newNode.parent.data) == true){
                let tempData = newNode.parent.data;
                newNode.parent.data = newNode.data;
                newNode.data = tempData;
                newNode = newNode.parent;
            }else{
                break;
            }
        }
    }

    getInsertingParent(){
        // 1. 첫 노드일 때(루트)
        if(this.lastInsertedNode.parent == null){
            return this.lastInsertedNode;
        }
        else{
            // 2. 마지막 삽입노드가 부모의 왼쪽 노드일 때
            if(this.lastInsertedNode == this.lastInsertedNode.parent.left){
                return this.lastInsertedNode.parent;
            }
            // 3. 마지막 삽입노드가 부모의 오른쪽 노드일 때
            else{
                let current = this.lastInsertedNode;
                let firstRightSibling = null;
                while(current.parent.parent != null){
                    current = current.parent;

                    // 오른쪽 형제가 있으면 오른쪽 형제의 가장 왼쪽 자식노드를 구한다.
                    firstRightSibling = this.getRightSibling(current);
                    if(firstRightSibling != null){
                        while(firstRightSibling.left != null){
                            firstRightSibling = firstRightSibling.left;
                        }
                        break;
                    }
                }

                // 3.a 상위노드에서 오른쪽 형제가 있는 경우
                if(firstRightSibling != null && firstRightSibling != this.lastInsertedNode.parent){
                    return firstRightSibling;
                }
                // 3.b 상위노드에서 오른쪽 형제가 없는 경우
                else if(current.parent.right == current){
                    current = this.root;
                    while(current.left != null){
                        current = current.left;
                    }
                    return current;
                }
            }
        }
    }

    getRightSibling(node){
        if(node.parent.right != node){
            return node.parent.right;
        }
        return null;
    }

    getLeftSibling(node){
        if(node.parent.left != node){
            return node.parent.left;
        }
        return null;
    }

    isBigPriority(first, second){
        return (first.priority < second.priority);
    }

    remove(){
        let deletedNode = null;
        let prevLastInsertedNode = null;

        if(this.lastInsertedNode == this.root){
            deletedNode = this.root;
            this.root = null;
            this.lastInsertedNode = null;
            return deletedNode;
        }

        // 삭제할 노드가 부모의 왼쪽 노드일 때
        if(this.lastInsertedNode == this.lastInsertedNode.parent.left){
            let current = this.lastInsertedNode;
            let firstLeftSibling = null;
            while(current.parent.parent != null){
                current = current.parent;

                // 왼쪽 형제가 있으면 왼쪽 형제의 가장 오른쪽 자식노드를 구한다.
                firstLeftSibling = this.getLeftSibling(current);
                if(firstLeftSibling != null){
                    while(firstLeftSibling.right != null){
                        firstLeftSibling = firstLeftSibling.right;
                    }
                    break;
                }
            }

            // 3.a 상위노드에서 왼쪽 형제가 있는 경우
            if(firstLeftSibling != null && firstLeftSibling != this.lastInsertedNode.parent){
                 prevLastInsertedNode = firstLeftSibling;
            }
            // 3.b 상위노드에서 왼쪽 형제가 없는 경우
            else if(current.parent.left == current){
                current = this.root;
                while(current.right!= null){
                    current = current.right;
                }
                prevLastInsertedNode = current;
            }
        }
        // 3. 삭제할 노드가 부모의 오른쪽 노드일 때
        else{
            prevLastInsertedNode = this.lastInsertedNode.parent.left;
        }

        let tempData = this.root.data;
        this.root.data = this.lastInsertedNode.data;
        this.lastInsertedNode.data = tempData;
        if(this.lastInsertedNode.parent.left == this.lastInsertedNode){
            this.lastInsertedNode.parent.left = null;
        }else{
            this.lastInsertedNode.parent.right = null;
        }
        this.lastInsertedNode.parent = null;
        deletedNode = this.lastInsertedNode;
        this.lastInsertedNode = prevLastInsertedNode;


        // 루트노드부터 제자리 찾아가기
        let current = this.root;
        do{
            let higherChild = null;
            higherChild = this.getHigherPriorityChild(current.left, current.right);
            if(higherChild == null){
                break;
            }
            else if(this.isBigPriority(current.data, higherChild.data) == false){
                let tempData = current.data;
                current.data = higherChild.data;
                higherChild.data = tempData;
                current = higherChild;
            }
        }while(current.left != null || current.right != null)
        return deletedNode;
    }

    getHigherPriorityChild(left, right){
        if(left == null){
            return right;
        } else if(right == null){
            return left;
        } else if(this.isBigPriority(left.data, right.data)){
            return left;
        } else{
            return right;
        }
    }
}

class HeapData{
    constructor(data, priority){
        this.data = data;
        this.priority = priority;
    }
}

let heap = new Heap();
heap.insert(new HeapData("enemy1", 2.15));
heap.insert(new HeapData("enemy2", 3.2));
heap.insert(new HeapData("enemy3", 0.5));

//console.log(heap.remove());
if(heap.root){
    heap.root.inOrderTraversal(heap.root);
}