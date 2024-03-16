const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin")

const adminChecker = async (req, res, next) => {
    let token
    if(req?.headers?.authorization?.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const admin = await Admin.findById(decoded.id);
            if(admin.username !== decoded.username || admin.password !== decoded.password) {
                return res.status(400).json({message: "Token eskirgan. Iltimos, qaytadan kiring"})
            }
            req.adminData = admin;
            next()
        } catch (err) {
            console.log(err)
            res.status(400).json({
                message: "Token mudati tugagan. Iltimos qaytadan ilovaga kiring",
            });
        }
    }else{
        res.status(500).json({message: "Hech qanday token biriktirilmagan"})
    }
}

module.exports = adminChecker;