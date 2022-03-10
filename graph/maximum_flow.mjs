class City{
    constructor(name){
        this.name = name;
        this.adjacent_cities = {};
    }

    addAdjacentCity(city, flowAndCapacity){
        this.adjacent_cities[city.name] = flowAndCapacity;
    }

    removeAdjacentCity(city){
        delete this.adjacent_cities[city.name];
    }
}

class MaximumFlow{
    constructor(){
        this.all_cities = {};
    }

    registerCity(city){
        this.all_cities[city.name] = city;
    }

    DFS(source, sink, visited_cities = {}){
        if(source.name == sink.name){
            return true;
        }
        visited_cities[source.name] = true;
        console.log(`정점: ${source.name}`);

        for(let adjacent in source.adjacent_cities){
            if(visited_cities[adjacent]){
                continue;
            }else{
                if(this.DFS(this.all_cities[adjacent], sink, visited_cities) == true){
                    return true;
                }
            }
        }

        return false;
    }
}

let s = new City("S");
let t = new City("T");
let a = new City("a");
let b = new City("b");

let maximum_flow = new MaximumFlow();
maximum_flow.registerCity(s);
maximum_flow.registerCity(t);
maximum_flow.registerCity(a);
maximum_flow.registerCity(b);

s.addAdjacentCity(a,{ flow: 0, capacity: 2});
s.addAdjacentCity(b,{ flow: 0, capacity: 2});

a.addAdjacentCity(b,{ flow: 0, capacity: 1});
a.addAdjacentCity(t,{ flow: 0, capacity: 2});

b.addAdjacentCity(t,{ flow: 0, capacity: 2});

//console.log(s);
console.log(maximum_flow.DFS(s, t));