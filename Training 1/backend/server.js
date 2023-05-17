import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import TicketRouter from "./routes/Ticket.router.js";
import ProductRouter from "./routes/Product.routes.js";

const app = express();
dotenv.config();

//db connection
const connectdb = () => {
    try{
        mongoose.connect(process.env.MONG_URL).then(()=>{
            console.log("connected DB");
        })
    }catch(err){
        throw err;
    }
}

// app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/ticket",TicketRouter);
app.use("/product",ProductRouter);

//connection
app.listen(5000,()=>{
    connectdb();
    console.log("port is running in 5000");
});
