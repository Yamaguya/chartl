const cors = require('cors')
const express = require('express')
var app = express()
app.use(cors())
app.options('*', cors());

app.get("/api", (req, res) => {
    res.json({"API_KEY": "c1cdfe36b37e79fa24ca83d862a9dcaf"})
})

app.listen(5000, () => {console.log("Server started at 5000")})