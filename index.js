import express from "express";
import "express-async-errors";
import dotenv from 'dotenv';
import cors from "cors";
import {database} from "./config/mongoDb.js";
import {handleError} from "./utils/error.js";
import {productRoute} from "./routes/product.route.js";
import {userRoute} from "./routes/user.route.js";
import {reviewRoute} from "./routes/review.route.js";
import {orderRoute} from "./routes/order.route.js";
import {emailRoute} from "./routes/email.route.js";

dotenv.config();

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('App is working')
});

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/reviews', reviewRoute)
app.use('/api/orders', orderRoute)
app.use('/api/email',emailRoute)

app.use(handleError);


// CONNECTION WITH DATABASE

database();
const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listing on http://localhost:${PORT}`)
})
