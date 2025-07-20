import  express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { dbConnectioc } from './db/dbConnection.js'
import { userRoutes } from './src/models/user/user.route.js';
import {cardRoutes} from './src/models/card/card.route.js'
import {orderRoutes} from './src/models/order/order.route.js';
import { productRoutes } from './src/models/product/product.route.js';

const app=express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
dbConnectioc
app.use(userRoutes)
app.use(productRoutes)
app.use(cardRoutes)
app.use(orderRoutes)
app.get("/",(req,res)=>{
    res.json({message:"Hello World", data: req.name})
})
app.listen(3000);