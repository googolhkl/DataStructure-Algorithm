const I = Infinity;
const map = [
    [0,2,9,0],
    [1,0,6,4],
    [0,7,0,8],
    [6,3,0,0]
]

let min = Infinity;

function dfs(city, visited, unvisited){
    if(unvisited.length == 0){ // 기저조건
        return map[city][0]; // 마지막 도시에서 시작도시까지 거리
    }
    let prevMin = min;

    for(let i = 0; i < unvisited.length; i++){ // 방문하지 않은 도시 순회
        if(map[city][unvisited[i]] == 0) continue; // 현재 도시라면 건너 뛰기

        // 방문하지 않은 도시를 방문했다고 설정
        visited.push(unvisited[i]); 
        let tempUnvisited = unvisited.filter((item) => item != unvisited[i]);

        min = Math.min(min, dfs(unvisited[i],visited, tempUnvisited) + map[city][unvisited[i]]); // 현재 도시에서 다음 도시까지 가는 거리 + 다음 거리에서 가장 작은 값들중에서 가장 작은 값들을 더함
    }

    return min;
}

let a = dfs(0, [], [0,1,2,3]);

console.log(a);