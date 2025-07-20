import {productModel} from "../../../db/myModels/product.model.js"

let get_Products = async (req, res) => {
    try {
        let products =await productModel.find();
        res.status(200).json({message:"the all products",data:products});
    }
    catch(err) { res.status(500).json({error:err})};
}

let add_product = async (req, res) => {
    try{
        let product=await productModel.create(req.body);
        res.status(201).json({message:"the product is added",data:product});
    }catch(err){
        res.status(500).json({error:err})
    }
};
let update_product = async (req, res) => {
   try {
       let {id} = req.params;
       let product =await productModel.findByIdAndUpdate(id, req.body, {new: true});
       if (!product) {
           return res.status(404).json({ message: "Product not found" });
       }
       res.status(200).json({message: "the product is updated", data: product});
   }
   catch(err){
       res.status(500).json({error:err})
   }
};
let delete_product = async (req, res) => {
    try{
        let {id} = req.params;
        let product =await productModel.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({message: "the product is deleted", data: product});
    }
    catch(err){
        res.status(500).json({error:err})
    }
};
export {
    get_Products,
    add_product,
    update_product,
    delete_product,
}
