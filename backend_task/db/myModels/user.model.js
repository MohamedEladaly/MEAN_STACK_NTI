import mongoose, { Schema,model } from "mongoose";
const userSchema= new Schema({
    userName:{type:String,rquired:true},
    email:{type:String,rquired:true},
    password:{type:String,rquired:true},
    role:{
     type:String,
     enum:['admin', 'user'],
     default:"user"
    }

},
{
    timestamps: true,
    versionKey:false
}
)
export const userModel = model("usre",userSchema);