import ProductModel from "../model/Product.Model.js";

//create
export const CreateProduct = async (req,res,next) =>{
    try{
        const newproduct = new ProductModel(
            {
                PName : req.body.PName,
                PPrice : req.body.PPrice,
                TID : req.body.TID,
            }
        )
        await newproduct.save();
		res.status(200).json("product has been created.....");
    }catch(err){
        next(err)
    }
}
//filter
export const FilterProduct = async(req,res,next) => {
    try{
        const filter = await ProductModel.find({TID:req.body.TID});
        res.status(200).json(filter);
    }catch(err){
        next(err);
    }
}

//delete
export const DeleteProduct = async (req,res,next) => {
    try{
       await ProductModel.findByIdAndDelete(req.params.id);
       res.status(200).json(' deleted......');
    }catch(err){
        next(err);
    }
}
//get by id
export const GetByIDProduct = async (req,res,next) => {
    try{
        const getbyproduct = await ProductModel.findById(req.params.id);
        res.status(200).json(getbyproduct);
    }catch(err){
        next(err);
    }
}

//update 
export const UpdateProduct = async (req, res , next) => {
    try{
        const updateProduct = await ProductModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updateProduct);

    }catch(err){
        next(err)
    }
}