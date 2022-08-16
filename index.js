import express from "express";
import "express-async-errors";
import dotenv from 'dotenv';
import cors from "cors";
import {database} from "./config/mongoDb.js";

dotenv.config();

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('App is working')
})



app.use(handleError);


// CONNECTION WITH DATABASE

database();
const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listing on http://localhost:${PORT}`)
})