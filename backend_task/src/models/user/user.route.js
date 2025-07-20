import express from "express"
import {get_user,login,delete_user,put_user,post_user} from "./user.controller.js";
import {emailCheck} from "../../middelware/emailcheck.js";
import {getToken, isAdmin} from "../../middelware/token.js";

export const userRoutes = express.Router()
userRoutes.get("/user",getToken,isAdmin,get_user);
userRoutes.post("/user/login",login);
userRoutes.post("/user/signup",emailCheck,post_user);
userRoutes.put("/user/:id",getToken,isAdmin,put_user);
userRoutes.delete("/user/:id",getToken,delete_user);
