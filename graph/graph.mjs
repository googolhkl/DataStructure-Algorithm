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

DFS(ben);