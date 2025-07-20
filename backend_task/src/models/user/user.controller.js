import { userModel} from "../../../db/myModels/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
let get_user =async (req,res)=>{
    let data = await userModel.find();
    res.json({message:"success",data:data})
}
let post_user=async (req,res)=>{
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        let data = await userModel.create(req.body)
        data[0].password = undefined
        res.status(201).json({message: "success", data: data})
    }
    catch(err){
        res.status(500).json({message:"error",data:err})
    }
}
let login = async (req, res, next) => {
    try {
        let user = await userModel.findOne({email: req.body.email});
        var check1, check2 = true;
        if (user) {
            let match = await bcrypt.compare(req.body.password, user.password);

            if (match) {
                let token = jwt.sign({_id: user._id, role: user.role}, "key");
                return res.status(200).json({message: "success", token});
            } else {
                check1 = false;
            }
        } else {
            check2 = false;
        }
        if (check1 & check2) {
            return res.status(404).json({message: "email not found or password not correct"});
        }
    } catch (error) {
        res.status(500).json({message: "error", error});
    }
};

let put_user=async (req,res)=>{
    try {
        let data = await userModel.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
        if (!data) return res.status(404).json({ message: "User not found" });
        res.json({message: "success", data: data})

    }catch(error){
        res.status(500).json({message: "error", error})
    }
}
let delete_user=async (req,res)=>{
    try {
        let data = await userModel.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ message: "User not found" });
        res.json({message: "success", data: data})
    }catch(error){
        res.status(500).json({message: "error", error})
    }
}
export {
    get_user,
    post_user,
    login,
    put_user,
    delete_user,
};