import mongoose, { Schema } from "mongoose";
const cardSchema=new Schema({
user:{
    type:mongoose.Types.ObjectId,
    ref:"user",
    required :true,
},
items:[
    {product:{
        type:mongoose.Types.ObjectId,
        ref:"product",
        required:true,

    },
        quantity
            :{
        type:Number,
        required:true
    }
},
]
},
{
    timestamps: true,
    versionKey:false
})
export const cardModel=mongoose.model("card",cardSchema);