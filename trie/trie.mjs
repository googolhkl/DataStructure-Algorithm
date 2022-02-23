import { Heap } from "./../heap/heap.mjs"

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

        currentNode.children["*"] = 0; // 모든 문자를 추가했다면 종료문자 *를 삽입
    }

    search(word, isCounting = false){
        let currentNode = this.root;

        for(let char of word){
            if(currentNode.children[char] != null){
                currentNode = currentNode.children[char];
            }else{
                return null
            }
        }

        if(isCounting == true){
            currentNode.children["*"]++;
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
                words.push(new WordData(word, childNode));
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

    autoCompleteByCount(word){
        let words = trie.autoComplete(word); // 자동완성 단어들

        // 힙 정렬(내림차순)
        let heap = new Heap();
        heap.isBigPriority = function(first, second){
            return (first.priority > second.priority);
        }
        for(let word of words){
            heap.insert(word);
        }

        let sortedBySearchCount = [];
        do{ // 힙에서 꺼내면서 배열에 삽입
            let removed = heap.remove();
            if(removed == null){
                break;
            }else{
                sortedBySearchCount.push(removed);
            }
        }while(true)

        return sortedBySearchCount;
    }
}

class WordData{
    constructor(word, count){
        this.word = word;
        this.count = count;
        this.priority = count;
    }
}


let trie = new Trie();

trie.insert("감자");
trie.insert("김치");
trie.insert("감자부침개");
trie.insert("감자볶음");
trie.insert("김치찌개");
trie.insert("두부");

trie.search("감자", true); // 유저들이 검색을함(counting됨)
trie.search("감자", true);
trie.search("감자", true);
trie.search("감자부침개", true);
trie.search("감자부침개", true);



console.log(trie.autoCompleteByCount("감자"));