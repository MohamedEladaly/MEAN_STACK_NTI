import {orderModel} from "../../../db/myModels/order.model.js";
import {cardModel} from "../../../db/myModels/card.model.js";

let createOrder= async (req, res) => {

    try{
        let card=await cardModel.findOne({user:req.user._id}).populate("items.product");
        if(!card||card.items.length==0) return res.status(400).json({message:"No cards found or empty"});let order_items = card.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
        }));
        let total_price= card.items.reduce((acc, item) => acc +( item.quantity*item.product.price), 0);
        let order = await orderModel.create({
            user:req.user._id,
            items:order_items,
            totalPrice:total_price,
        })
        card.items=[];
        await card.save();
        res.status(200).json({message:"Successfully created order"});
    }
    catch(err){

        res.status(500).json({message:"Something went wrong.",error:err})
    }
}

let getMyOrders= async (req, res) => {

    try{
        let userid = req.user._id;
        let orders=await orderModel.find({user:userid})
        return res.status(200).json(orders)
    }
    catch(err){

        res.status(500).json({message:"Something went wrong.",error:err})
    }
}


let getAllOrders= async (req, res) => {
    try{
        let orders=await orderModel.find()
        return res.status(200).json(orders)
    }
    catch(err){

        res.status(500).json({message:"Something went wrong.",error:err})
    }
}
let updateOrder = async (req, res) => {
    try {
        let { orderId, productId, quantity } = req.body;

        let order = await orderModel.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        let item = order.items.find(
            (item) => item.product._id === productId
        );
        if (!item) return res.status(404).json({ message: "Product not found in order" });

        item.quantity = quantity;
        order.totalPrice = order.items.reduce(
            (acc, item) => acc + item.quantity * item.product.price, 0);

        await order.save();

        res.status(200).json({ message: "Order updated successfully", data: order });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

let updateOrderStatus= async (req, res) => {
try{
    let {orderId} = req.params;
    let {status} =req.body;
    let order=await orderModel.findByIdAndUpdate(orderId,{Status:status},{new:true});
    if( !order)return res.status(404).send({message:"No order found."})
    res.status(200).send({message:"Order updated successfully.",data:order})
}
catch(err){
    res.status(500).json({message:"Something went wrong.",error:err})
}
}
let deleteOrder= async (req, res) => {
    try{
        let {orderId} = req.params;
        let order=await orderModel.findByIdAndDelete(orderId)
        if( !order) return res.status(404).send({message:"No order found."})
        res.status(200).send({message:"Order deleted successfully."})
    }
    catch(err){
        res.status(500).json({message:"Something went wrong.",error:err})
    }
}
export {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    updateOrder,
    deleteOrder,
}