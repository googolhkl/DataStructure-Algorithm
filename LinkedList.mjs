class Node{
    constructor(data, next = null){
        this.data = data;
        this.next = next;
    }
}

class LinkedList{
    head = null;
    count = 0;

    printAll(){
        let currentNode = this.head;
        let text = "[";
        while(currentNode != null){
            text += currentNode.data;
            currentNode = currentNode.next;
            if(currentNode != null) {
                text += ", ";
            }
        }
        text += "]";
        console.log(text);
    }

    clear(){
        this.head = null;
        this.count = 0;
    }

    insertAt(index, data){
        if(index > this.count || index < 0){
            throw new Error("범위를 넘어갔습니다.");
        }

        let newNode = new Node(data);
        // head에 삽입하면 O(1)의 성능
        if(index == 0) {
            if(this.head == null) {
                this.head = newNode;
            } else {
                newNode.next = this.head;
                this.head = newNode;
            }
        } else {
            let currentNode = this.head;
            for(let i = 0; i < index - 1; i++){
                currentNode = currentNode.next;
            }
            newNode.next = currentNode.next;
            currentNode.next = newNode;
        }
        this.count++;
    }
    

    // 마지막 삽입
    insertLast(data){
        let newNode = new Node(data);
        this.insertAt(this.count, newNode.data);
    }

    // 인덱스 삭제
    deleteAt(index){
        if(index >= this.count || index < 0){
            throw new Error("범위를 넘어갔습니다.");
        }

        let currentNode = this.head;
        // head에서 삭제하면 O(1)의 성능
        if(index == 0){
            if(this.head != null) {
                let deleteNode = this.head;
                this.head = this.head.next;
                this.count--;
                return deleteNode;
            }
        } else{
            for(let i = 0; i < index - 1; i++){
                currentNode = currentNode.next;
            }
            // 이제 currentNode가 삭제할 노드 이전노드임.
            let deleteNode = currentNode.next;
            currentNode.next = currentNode.next.next;
            this.count--;
            return deleteNode;
        }
    }
    
    // 마지막 삭제
    deleteLast(){
        let index = this.count - 1;
        if(index < 0) {
            index = 0;
        }
        return this.deleteAt(index);
    }

    // 인덱스 읽기
    getNodeAt(index){
        if(index >= this.count || index < 0){
            throw new Error("범위를 넘어갔습니다.");
        }

        let currentNode = this.head;
        for(let i = 0; i < index; i++){
            currentNode = currentNode.next;
        }
        return currentNode;
    }
}

export { Node, LinkedList };