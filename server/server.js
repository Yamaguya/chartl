const cors = require('cors');
const express = require('express');

// Load environment variables
require('dotenv').config(); 

var app = express();

app.use(cors());
app.options('*', cors());

const API_KEY = process.env.API_KEY || "default_api_key";

// Endpoint to provide API_KEY securely
app.get("/api", (req, res) => {
    res.json({"API_KEY": API_KEY})
});

app.listen(5000, () => {
    console.log("Server started at 5000")
});