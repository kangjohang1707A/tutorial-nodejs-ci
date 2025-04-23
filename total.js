function totalByReduce(N) {
    return Array.from({ length: N }, (_, i) => i + 1).reduce((acc, cur) => acc + cur, 0)
}

function totalByLoop(N) {
    let total = 0;
    for (let i = 0; i <= N; i++) {
        total += i
    }

    return total;
}

function totalByFormula(N) {
    return (N * (N + 1)) / 2;
}

module.exports = {
    totalByFormula,
    totalByLoop,
    totalByReduce
}