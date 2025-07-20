import mongoose from "mongoose";
export const dbConnectioc=mongoose.connect("mongodb://localhost:27017/myData")
.then(()=>{console.log("datadase connect")})
.catch((err)=>{console.log(err)})