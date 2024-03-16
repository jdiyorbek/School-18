const bcrypt = require("bcrypt")
const Admin = require("../models/Admin")
const { generateToken } = require("../db/jwtToken")

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if(!username || !password) {
            return res.status(400).json({message: "Barcha qatorlarni to\'ldiring"})
        }

        const admin = await Admin.findOne({username})
        if(!admin) {
            return res.status(401).json({message: "Username yoki parol noto\'g\'ri"})
        }
        const match = await bcrypt.compare(password, admin.password)
        if(!match) {
            return res.status(401).json({message: "Username yoki parol noto\'g\'ri"})
        }

        const token = await generateToken(admin._id ,admin.username, admin.password)

        res.status(200).json({
            message: "Muvaffaqiyatli kirildi",
            token,
            data: {
                username: admin.username,
                email: admin.email,
            }
        })
    } catch (err) {
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

module.exports = { login }