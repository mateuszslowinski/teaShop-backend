import express from "express";
import dotenv from 'dotenv';
import {database} from "./config/mongoDb.js";



dotenv.config();

const app = express()

app.get('/', (req, res) => {
    res.send('hello world')
})

// CONNECTION WITH DATABASE
database();


const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listing on http://localhost:${PORT}`)
})