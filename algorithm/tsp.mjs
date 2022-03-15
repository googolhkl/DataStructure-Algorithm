const costs = [
    [0,2,9,0],
    [1,0,6,4],
    [0,7,0,8],
    [6,3,0,0]
]


function tsp(city, visitedCities){
    if(visitedCities == (1 << costs.length) - 1){ // 마지막 방문 도시라면 
        return costs[city][0]; // 마지막 도시에서 시작도시로 거리 리턴
    }

    if(dp[city][visitedCities] != Infinity){ // 이미 계산했다면 계산한 결과 리턴
        return dp[city][visitedCities];
    }else{ // 계산한 적이 없다면 계산
        for(let i = 0; i < costs.length; i++){ // 모든 도시 순회
            if((visitedCities & (1 << i)) == 0 && costs[city][i] != 0){ // 방문하지않고 자기 자신이 아닌 경우
                // 재귀적으로 호출                                           {(1,2) + T(2, {3,4})}
                // 재귀적으로 호출                                           {(1,3) + T(3, {2,4})}
                // 재귀적으로 호출                                           {(1,4) + T(4, {2,3})}
                dp[city][visitedCities] = Math.min(dp[city][visitedCities], costs[city][i] + tsp(i, visitedCities | (1 << i)));
            }
        }

        return dp[city][visitedCities];
    }
}

const dp = Array.from(Array(costs.length), () => Array((1 << costs.length) - 1).fill(Infinity));
let minimumCost = tsp(0, 1);
console.log(minimumCost);