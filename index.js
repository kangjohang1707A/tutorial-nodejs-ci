const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const { totalByFormula, totalByLoop, totalByReduce } = require("./total");
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello from simple server :)')
})
const WAY_TOTAL = ["total-by-reduce", "total-by-loop", "total-by-formula"]

app.get('/api/total', (req, res, next) => {
    const { way, N } = req.query;

    if (!way || !N) {
        return res.status(400).send({ message: "Invalid input have way or N" })
    }

    if (!WAY_TOTAL.includes(way)) {
        return res.status(400).send({
            message: `Invalid input way include 'total-by-reduce' or 'total-by-loop' or 'total-by-formula'`
        })
    }

    if ((+N === NaN) || +N < 0) {
        return res.status(400).send({ message: "Invalid input N interger" })
    }

    let total = 0;

    switch (way) {
        case "total-by-reduce":
            total = totalByReduce(+N);
            break;
        case "total-by-loop":
            total = totalByLoop(+N);
            break;
        case "total-by-formula":
            total = totalByFormula(+N);
            break;
        default:
            break;
    }

    res.send({ total, way })
})

app.listen(port, () => console.log('> Server is up and running on port : ' + port))