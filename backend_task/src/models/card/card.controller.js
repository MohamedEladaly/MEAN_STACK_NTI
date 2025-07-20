import {cardModel} from "../../../db/myModels/card.model.js";

let getCard= async (req, res) => {

    try {
        const userId = req.user._id;
        let card = await cardModel.find({user: userId}).populate("items.product")
        if(!card)return res.status(404).send({message:"No card found"})

        res.status(200).json({ message: "Cart cleared", data: card });
    }
    catch(err){
        res.status(500).json({message:"Something went wrong",error:err});
    }
}

let addToCard= async (req, res) => {
    try{
        const userId = req.user._id;
        let {productId,quantity} = req.body;
    let card = await cardModel.find({user:userId})
    if(!card) card=await cardModel.create({user:userId,items:[]});
    let product=card.items.find(item=>item.id===productId);
    if(product) card.quantity+=quantity;
    else card.items.push({product:productId,quantity:quantity});
        await card.save();
    res.status(200).json({ message: "Cart cleared", data: card });
}
catch(err){
    res.status(500).json({message:"Something went wrong",error:err});
}
}

let updateCard= async (req, res) => {
    try{
        let {product_id,quantity} = req.body;
        const userId = req.user._id;
        let card =await cardModel.findOne({user:userId})
        if(!card) return res.status(404).send({message:"No card found"})

        const item = await cardModel.findOne({product:product_id});
        if (!item) return res.status(404).json({ message: "Item not found" });
          item.quantity=quantity;
        await card.save();
        res.status(200).json({message:"Cart updated successfully",data: item});
    }
    catch(err){

        res.status(500).json({error:err});
    }
}

let removeCard= async (req, res) => {
    try{
        const userId = req.user._id;
        let {productId} = req.params;
        let card=await cardModel.findOne({user:userId})
        if(!card)return res.status(404).send({error:"No card with ID"});
        card.items=card.items.filter(item=>item.product.toString()!==productId);
        await card.save()
        res.status(200).json({ message: "item is removed" });
    }
    catch(err){
        res.status(500).json({error:err});
    }
}

let clearCard= async (req, res) => {
    try {
        const userId = req.user._id;
        let card = await cardModel.findOne({user: userId})
        if(!card)return res.status(404).send({message:"No card found"})
        card.items=[];
        await card.save();
        res.status(200).json({ message: "Cart cleared" });
    }
    catch(err){
        res.status(500).json({message:"Something went wrong",err});
    }
}
export {
    getCard,
    addToCard,
    updateCard,
    removeCard,
    clearCard,

}