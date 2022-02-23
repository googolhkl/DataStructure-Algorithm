class Node{
    constructor(){
        this.children = {}; // 자식 노드들
    }
}

class Trie{
    constructor(){
        this.root = new Node();
    }

    insert(word){
        let currentNode = this.root;

        for(let char of word){ // 해당 문자를 순회
            if(currentNode.children[char] != null){ // 해당 문자가 자식에 있으면
                currentNode = currentNode.children[char];
            }else{ // 해당 문자가 자식에 없다면
                let newNode = new Node(); // 자식에 문자 추가
                currentNode.children[char] = newNode;
                currentNode = newNode;
            }
        }

        currentNode.children["*"] = null; // 모든 문자를 추가했다면 종료문자 *를 삽입
    }

    search(word){
        let currentNode = this.root;

        for(let char of word){
            if(currentNode.children[char] != null){
                currentNode = currentNode.children[char];
            }else{
                return null
            }
        }

        return currentNode;
    }

    getAllWords(startNode = null, word = "", words = []){
        let currentNode = this.root;
        if(startNode != null){
            currentNode = startNode;
        }

        for(let key in currentNode.children){
            let childNode = currentNode.children[key];
            if(key == "*"){
                words.push(word);
            }else{
                this.getAllWords(childNode, word + key, words);
            }
        }

        return words;
    }

    autoComplete(word){
        let currentNode = this.search(word);

        if(currentNode == null){
            return null;
        }

        return this.getAllWords(currentNode, word);
    }
}


let trie = new Trie();

trie.insert("감자");
trie.insert("김치");
trie.insert("감자부침개");
trie.insert("감자볶음");
trie.insert("김치찌개");
trie.insert("두부");

console.log(trie.autoComplete("감자"));