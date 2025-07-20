import mongoose, { Schema,model } from "mongoose";
const productSchema= new Schema({
    name:{type:String,rquired:true},
    desc: String,
    price: { type: Number, required: true },
    category: String,
    images: [String],
    bougthby:{
        type:mongoose.Types.ObjectId,
        ref :"user"
    }
    
},
{
    timestamps: true,
    versionKey:false
}
)
export const productModel = model("product",productSchema);