const express = require('express')
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello from simple server :)')
})

app.listen(port,"0.0.0.0", () => console.log('> Server is up and running on port : ' + port))