const Admin = require("../models/Admin");
const {generateToken} = require("../db/jwtToken");
const bcrypt = require("bcrypt")

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
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const updatePassword = async (req, res) => {
    try {
        const { password } = req.body
        if(!password) {
            return res.status(400).json({message: "Yangi parol yuborilmagan"})
        }
        const match = await bcrypt.compare(password, req.adminData.password)

        console.log(match)
        if(match) {
            return res.status(400).json({message: "Kiritilgan va joriy parol bir xil. Iltimos, boshqa parol kiriting."})
        }

        const hashed = await bcrypt.hash(password, 9)

        const updatedAdmin = await Admin.findOneAndUpdate({username: req.adminData.username}, {password: hashed}, {new: true})

        if(!updatedAdmin) {
            return res.status(500).json({message: "Admin parolini yangilashda xatolik yuz berdi"})
        }

        const token = generateToken(updatedAdmin._id, updatedAdmin.username, updatedAdmin.password)

        res.status(200).json({
            message: "Admin paroli muvaffaqiyatli yangilandi",
            newToken: token,
            data: {
                username: updatedAdmin.username,
                email: updatedAdmin.email,
            },
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

module.exports = { profile, updateUsername, updatePassword }