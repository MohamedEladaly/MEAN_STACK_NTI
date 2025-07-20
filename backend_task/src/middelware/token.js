import jwt from 'jsonwebtoken';
const getToken = (req, res, next) => {
    try{
        let authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied, token missing or invalid format" });
        }

        let token = authHeader.split(" ")[1];
    jwt.verify(token, "key", (err, decoded) => {
        if (err) return res.status(401).json({err})
        req.user = decoded;
        next();
    });
    }
    catch(err){
        res.status(401).json({massage:"error",err})
    }
}
const isAdmin = (req, res, next) => {
    if (req.user.role === "admin") return next();
    res.status(403).json({massage: "You are not admin"})
}
export {
    getToken,
    isAdmin,
}