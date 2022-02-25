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


let jake = new Vertex("jake");
let ben = new Vertex("Ben");
let joy = new Vertex("Joy");
let ivy = new Vertex("Iby");
let elin = new Vertex("Elin");
let ann = new Vertex("Ann");
let jon = new Vertex("Jon");

jake.addAdjacentVertex(ben);
ben.addAdjacentVertex(jake);
joy.addAdjacentVertex(ben);
joy.addAdjacentVertex(ivy);
ivy.addAdjacentVertex(joy);
ivy.addAdjacentVertex(ben);
elin.addAdjacentVertex(ivy);
elin.addAdjacentVertex(ann);
ann.addAdjacentVertex(ben);
ann.addAdjacentVertex(jon);
ann.addAdjacentVertex(elin);
jon.addAdjacentVertex(ann);


console.log(ann.adjacent_vertices);
ann.removeAdjacentVertex(jon);
console.log(ann.adjacent_vertices);