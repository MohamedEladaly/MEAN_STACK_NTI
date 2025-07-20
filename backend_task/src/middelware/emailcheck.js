import { userModel } from "../../db/myModels/user.model.js";
import bcrypt from 'bcrypt';
export const emailCheck = async (req, res,next) => {
    try {
        let found = await userModel.findOne({email: req.body.email});
        if (found) return res.status(401).json({error: "Email already exists"})
        req.body.password = await bcrypt.hash(req.body.password, 10)
        next();
    }
    catch(err){
        res.status(500).json({massage:"error",err})
    }
}