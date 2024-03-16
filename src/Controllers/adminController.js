const Admin = require("../models/Admin")
const {generateToken} = require("../db/jwtToken");

const profile = async (req, res) => {
    try {
        req.status(200).json({
            message: "Admin ma\'lumotlari",
            data: {
                username: req.adminData.username,
                email: req.adminData.email,
            }
        })
    } catch (err) {
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const updateUsername = async (req, res) => {
    try {
        const { username } = req.body
        if(req.adminData.username === username){
            return res.status(400).json({message: "Kiritilgan username bilan hozirgi username bir xil"})
        }

        const updatedUser = await Admin.findByIdAndUpdate(req.adminData._id)
        if(!updatedUser){
            return res.status(400).json({message: "Usernameni yangilashda xatolik bo'ldi"})
        }

        const token = generateToken(updatedUser._id, updatedUser.username, updatedUser.password)

        res.status(200).json({
            message: "Username muvaffaqiyatli yangilandi",
            newToken: token,
            data: {
                username: updatedUser.username,
                email: updatedUser.email,
            },
        })
    } catch (err) {
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

module.exports = { profile, updateUsername }