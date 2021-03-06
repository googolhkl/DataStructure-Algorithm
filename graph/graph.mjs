import { Queue } from "./../Queue.mjs";

class Vertex{
    constructor(value){
        this.value = value;
        this.adjacent_vertices = [];
    }

    addAdjacentVertex(vertex){
        this.adjacent_vertices.push(vertex);
    }

    removeAdjacentVertex(vertex){
        for(let i = 0; i < this.adjacent_vertices.length; i++){
            if(this.adjacent_vertices[i] == vertex){
                this.adjacent_vertices.splice(i--, 1);
            }
        }
    }
}

function DFS(vertex, visited_vertices = {}){

    visited_vertices[vertex.value] = true;

    console.log(`정점: ${vertex.value}`);

    // 인접 정점 순회
    for(let adjacent of vertex.adjacent_vertices){
        if(visited_vertices[adjacent.value]){ // 이미 방문한 정점이라면
            continue; //생략
        }else{
            DFS(adjacent, visited_vertices);
        }
    }
}

function BFS(vertex){
    let queue = new Queue();
    let visited_vertices = {};


    // 최초에 시작하는 정점을 방문했다고 저장하고 큐에도 넣는다.
    visited_vertices[vertex.value] = true;
    queue.enqueue(vertex);

    while(queue.isEmpty() == false){
        let currentVertex = queue.dequeue().data;
        console.log(`정점: ${currentVertex.value}`);

        for(let adjacent of currentVertex.adjacent_vertices){
            if(visited_vertices[adjacent.value]){
                continue;
            }else{
                visited_vertices[adjacent.value] = true;
                queue.enqueue(adjacent);
            }
        }
    }
}


let ben = new Vertex("Ben");
let ivy = new Vertex("Iby");
let joy = new Vertex("Joy");
let jake = new Vertex("jake");
let ann = new Vertex("Ann");
let jon = new Vertex("Jon");
let elin = new Vertex("Elin");
let owen = new Vertex("Owen");

ben.addAdjacentVertex(ivy); // Ben
ben.addAdjacentVertex(jake);
ben.addAdjacentVertex(ann);
ben.addAdjacentVertex(jon);
ivy.addAdjacentVertex(ben); // Ivy
ivy.addAdjacentVertex(joy);
joy.addAdjacentVertex(ivy); // Joy
joy.addAdjacentVertex(jake);
jake.addAdjacentVertex(ben); // Jake
jake.addAdjacentVertex(joy);
ann.addAdjacentVertex(ben); // Ann
jon.addAdjacentVertex(ben); // Jon
jon.addAdjacentVertex(elin);
elin.addAdjacentVertex(jon); // Elin
elin.addAdjacentVertex(owen);
owen.addAdjacentVertex(elin); // Owen




/*
console.log(ann.adjacent_vertices);
ann.removeAdjacentVertex(jon);
console.log(ann.adjacent_vertices);
*/

//DFS(ben);
BFS(ben);
