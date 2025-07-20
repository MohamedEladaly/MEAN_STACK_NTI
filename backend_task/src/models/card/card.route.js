import express from "express";
import {getToken} from "../../middelware/token.js";
import {addToCard, clearCard, getCard, removeCard, updateCard} from "./card.controller.js";

export let cardRoutes = express.Router();
cardRoutes.get("/cart", getToken, getCard);
cardRoutes.post("/cart/add", getToken, addToCard);
cardRoutes.put("/cart/item/:productId", getToken, updateCard);
cardRoutes.delete("/cart/item/:productId", getToken, removeCard);
cardRoutes.delete("/cart/clear", getToken, clearCard);