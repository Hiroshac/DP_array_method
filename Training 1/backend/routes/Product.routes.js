import express from "express";
import { CreateProduct, DeleteProduct, FilterProduct, GetByIDProduct, UpdateProduct } from "../controllers/Product.controller.js"

const router = express.Router();

//create
router.post("/add",CreateProduct);
//get by id
router.post("/getid",FilterProduct);
//delete
router.delete("/delete/:id",DeleteProduct);
//getbyid
router.get("/get/:id",GetByIDProduct);
//update
router.put("/update/:id",UpdateProduct);


export default router;