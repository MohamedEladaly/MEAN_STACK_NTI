import express from "express"
import {get_Products,add_product,update_product,delete_product} from "./product.controller.js";
import {getToken, isAdmin} from "../../middelware/token.js";

export const productRoutes = express.Router()
productRoutes.use(getToken)
productRoutes.get("/product",get_Products)
productRoutes.post("/product/add",isAdmin,add_product)
productRoutes.put("/product/:id",isAdmin,update_product)
productRoutes.delete("/product/:id",isAdmin,delete_product)