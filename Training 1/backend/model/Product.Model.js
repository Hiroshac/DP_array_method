import mongoose from "mongoose";

const Product = new mongoose.Schema({
    PName : {
        type : String,
    },
    PPrice : {
        type : String,
    },
    TID : {
        type : String,
    }
});
export default mongoose.model("product",Product);
