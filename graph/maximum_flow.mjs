class City{
    constructor(name){
        this.name = name;
        this.adjacent_cities = {};
    }

    addAdjacentCity(city, flowAndCapacity){
        this.adjacent_cities[city.name] = flowAndCapacity;
        city.adjacent_cities[this.name] = {flow: -flowAndCapacity.flow, capacity: flowAndCapacity.capacity};
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
            let adjacent_city = source.adjacent_cities[adjacent];
            if(visited_cities[adjacent]){
                continue;
            }else if(adjacent_city.capacity - adjacent_city.flow > 0){
                this.paths.push(source);
                if(this.DFS(this.all_cities[adjacent], sink, visited_cities) == true){
                    return true;
                }
            }
        }

        return false;
    }

    FordFulkerson(source, sink){
        let total = 0;

        while(this.DFS(source, sink)){
            //this.paths.push(sink);
            let currentPathFlow = Infinity;
            let tempPaths = [];

            while(this.paths.length != 0){
                let currentCity = this.paths.shift();
                tempPaths.push(currentCity);
                let nextCity = this.paths[0];
                //if(nextCity == null || currentCity == nextCity){
                if(nextCity == null){
                    break;
                }
                currentPathFlow = Math.min(currentPathFlow, (currentCity.adjacent_cities[nextCity.name].capacity - currentCity.adjacent_cities[nextCity.name].flow));
            }

            while(tempPaths.length != 0){
                let currentCity = tempPaths.shift();
                let nextCity = tempPaths[0];
                if(nextCity == null){
                    break;
                }
                currentCity.adjacent_cities[nextCity.name].flow += currentPathFlow;
                nextCity.adjacent_cities[currentCity.name].flow -= currentPathFlow;
            }

            total += currentPathFlow;

        }
        console.log(total);
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

//console.log(maximum_flow.DFS(s, t));
//console.log(maximum_flow.paths);

maximum_flow.FordFulkerson(s, t);
