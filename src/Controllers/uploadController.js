const { v4: uuidv4 } = require('uuid');
const path = require("path")
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage")
const storage = require("../utils/firebase");

const uploadImage = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({message: "Rasm yuklanmagan"})
        }
        const fileName = `${uuidv4().split("-").join("")}${path.extname(req.file.originalname)}`

        console.log(fileName)

        const storageRef = ref(storage, `image/${fileName}`)
        const metadata = {
            contentType: req.file.mimetype,
        };

        await uploadBytes(storageRef, req.file.buffer, metadata)
            .then(()=> {
                getDownloadURL(storageRef).then((url)=>{
                    res.status(200).json({url})
                }).catch((err) => {
                    console.error(err)
                    res.status(500).json({message: "Rasm yuklashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring"})
                })
            }).catch((err) => {
                console.error(err)
                res.status(500).json({message: "Rasm yuklashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring"})
            })
    }catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const uploadFile = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({message: "Fayl yuklanmagan"})
        }
        if(req.file.mimetype !== "application/pdf"){
            return res.status(400).json({message: "Kitob PDF formatda bo\'lishi kerak"})
        }
        const fileName = `${uuidv4().split("-").join("")}${path.extname(req.file.originalname)}`

        const storageRef = ref(storage, `/books/${fileName}`)
        const metadata = {
            contentType: req.file.mimetype,
        };

        await uploadBytes(storageRef, req.file.buffer, metadata)
            .then(()=> {
                getDownloadURL(storageRef).then((url)=>{
                    res.status(200).json({url})
                }).catch((err) => {
                    console.error(err)
                    res.status(500).json({message: "Rasm yuklashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring"})
                })
            }).catch((err) => {
                console.error(err)
                res.status(500).json({message: "Rasm yuklashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring"})
            })
    }catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

module.exports = { uploadImage, uploadFile }