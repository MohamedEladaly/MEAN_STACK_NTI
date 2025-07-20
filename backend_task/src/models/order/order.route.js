import express from "express";
import {getToken, isAdmin} from "../../middelware/token.js";
import {
    createOrder,
    deleteOrder,
    getAllOrders,
    getMyOrders,
    updateOrder,
    updateOrderStatus
} from "./order.controller.js";
export let orderRoutes = new express.Router();
orderRoutes.post("/order", getToken, createOrder);
orderRoutes.get("/order", getToken, getMyOrders);
orderRoutes.get("/orders", getToken, isAdmin, getAllOrders);
orderRoutes.put("/order/:id", getToken, isAdmin, updateOrderStatus);
orderRoutes.put("/order/:id", getToken, updateOrder);
orderRoutes.delete("/order/:id", getToken, deleteOrder);