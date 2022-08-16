import express from "express";
import dotenv from 'dotenv';



dotenv.config();

const app = express()


const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listing on http://localhost:${PORT}`)
})