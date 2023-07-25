import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from './Routes/user.js';
import postRoute from './Routes/post.js';
import path from "path";
import { fileURLToPath } from 'url';
import { config } from "dotenv";
import { connectDB } from "./database/db.js";

config({
    path: "./.env",
});

connectDB();

const app = express();

//middlewaes
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with the origin you want to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});
app.use(cors({
    credential: true,
    origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(cookieParser());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname ,'uploads')));

//routes
app.use("/user", userRoute);
app.use('/', postRoute);

app.listen(4000);