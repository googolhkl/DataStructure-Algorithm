class City{
    constructor(name){
        this.name = name;
        this.adjacent_cities = {};
    }

    addAdjacentCity(city, flowAndCapacity){
        this.adjacent_cities[city.name] = flowAndCapacity;
        //city.adjacent_cities[this.name] = {flow: -flowAndCapacity.flow, capacity: 0};
        city.adjacent_cities[this.name] = {flow: 0, capacity: 0};
    }

    removeAdjacentCity(city){
        delete this.adjacent_cities[city.name];
    }
}

class MaximumFlow{
    constructor(){
        this.all_cities = {};
        this.paths = [];
    }

    registerCity(city){
        this.all_cities[city.name] = city;
    }

    DFS(source, sink, visited_cities = {}){
        if(source.name == sink.name){
            return true;
        }
        visited_cities[source.name] = true;
        //console.log(`정점: ${source.name}`);

        for(let adjacent in source.adjacent_cities){
            let edge = source.adjacent_cities[adjacent];
            if(visited_cities[adjacent]){
                continue;
            }else if(edge.capacity - edge.flow > 0){
                //this.paths.push(this.all_cities[adjacent]);
                this.paths.push(source);
                if(this.DFS(this.all_cities[adjacent], sink, visited_cities) == true){
                    return true;
                }else{
                    this.paths.pop();
                }
            }
        }

        return false;
    }

    FordFulkerson(source, sink){
        let total = 0;

        while(this.DFS(source, sink)){
            this.paths.push(sink);
            console.log(this.paths);
            let currentPathFlow = Infinity;

            for(let i = 0; i < this.paths.length - 1; i++){
                let currentCity = this.paths[i];
                let nextCity = this.paths[i + 1];
                let edge = currentCity.adjacent_cities[nextCity.name];
                currentPathFlow = Math.min(currentPathFlow, (edge.capacity - edge.flow));
            }

            for(let i = 0; i < this.paths.length - 1; i++){
                let currentCity = this.paths[i];
                let nextCity = this.paths[i + 1];
                currentCity.adjacent_cities[nextCity.name].flow += currentPathFlow;
                nextCity.adjacent_cities[currentCity.name].flow -= currentPathFlow;
            }

            this.paths = [];
            total += currentPathFlow;
        }
        console.log(total);
    }
}

/*
let s = new City("S");
let t = new City("T");
let a = new City("a");
let b = new City("b");

let maximum_flow = new MaximumFlow();
maximum_flow.registerCity(s);
maximum_flow.registerCity(t);
maximum_flow.registerCity(a);
maximum_flow.registerCity(b);

s.addAdjacentCity(a,{ flow: 0, capacity: 1});
s.addAdjacentCity(b,{ flow: 0, capacity: 2});

a.addAdjacentCity(b,{ flow: 0, capacity: 1});
a.addAdjacentCity(t,{ flow: 0, capacity: 2});

b.addAdjacentCity(t,{ flow: 0, capacity: 2});

maximum_flow.FordFulkerson(s, t);
*/



let s = new City("S");
let t = new City("T");
let a = new City("A");
let b = new City("B");
let c = new City("C");
let d = new City("D");
let e = new City("E");
let f = new City("F");
let maximum_flow = new MaximumFlow();
maximum_flow.registerCity(s);
maximum_flow.registerCity(t);
maximum_flow.registerCity(a);
maximum_flow.registerCity(b);
maximum_flow.registerCity(c);
maximum_flow.registerCity(d);
maximum_flow.registerCity(e);
maximum_flow.registerCity(f);

s.addAdjacentCity(a,{ flow: 0, capacity: 3});
s.addAdjacentCity(b,{ flow: 0, capacity: 4});
s.addAdjacentCity(c,{ flow: 0, capacity: 5});

a.addAdjacentCity(d,{ flow: 0, capacity: 1});
a.addAdjacentCity(e,{ flow: 0, capacity: 3});

b.addAdjacentCity(e,{ flow: 0, capacity: 2});

c.addAdjacentCity(f,{ flow: 0, capacity: 7});

d.addAdjacentCity(t,{ flow: 0, capacity: 3});

e.addAdjacentCity(t,{ flow: 0, capacity: 5});

f.addAdjacentCity(e,{ flow: 0, capacity: 1});
f.addAdjacentCity(t,{ flow: 0, capacity: 4});
maximum_flow.FordFulkerson(s, t);

console.log("============ s ===============");
console.log(s.adjacent_cities);
console.log("============ a ===============");
console.log(a.adjacent_cities);
console.log("============ b ===============");
console.log(b.adjacent_cities);
console.log("============ c ===============");
console.log(c.adjacent_cities);
console.log("============ d ===============");
console.log(d.adjacent_cities);
console.log("============ e ===============");
console.log(e.adjacent_cities);
console.log("============ f ===============");
console.log(f.adjacent_cities);