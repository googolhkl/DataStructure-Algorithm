class Coin{
    constructor(won){
        this.won = won;
        this.count = 0;
    }
}

function coinChange(money){
    console.log(`${money} 동전으로 주기`);

    let coins = [];
    coins.push(new Coin(500));
    coins.push(new Coin(100));
    coins.push(new Coin(50));
    coins.push(new Coin(10));


    for(let i = 0; i < coins.length; i++){
        while(coins[i].won <= money){
            coins[i].count++;
            money -= coins[i].won;
        }
    }
    console.log(coins);
}

coinChange(2380);