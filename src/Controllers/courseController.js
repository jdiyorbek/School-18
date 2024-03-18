const Course = require("../models/Course")

const create = async (req, res) => {
    try {
        const { name, description, teacher, scheduledTime, phoneNumber, image } = req.body
        if(!name || !description || !teacher || scheduledTime === undefined || scheduledTime.length < 1 || !phoneNumber || !image) {
            return res.status(400).json({message: "Barcha qatorlarni to\'ldiring"})
        }

        const existingCourse = await Course.findOne({name})
        if(existingCourse) {
            return res.status(400).json({message: "Bunday nomli kurs allaqochon mavjud. Iltimos, boshqa nom toping"})
        }

        const newCourse = await new Course({
            name, description, teacher, scheduledTime, phoneNumber, image
        })

        const createdCourse = await newCourse.save()

        if(!createdCourse){
            return res.status(400).json({message: "Kursni yaratishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring"})
        }

        res.status(200).json({
            message: "Kurs muvaffaqiyatli yaratildi",
            data: createdCourse
        })
    }catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const getALl = async (req, res) => {
    try {
        const courses = await Course.find()
        const quantity = await Course.find().count()

        if(quantity === 0) {
            return res.status(200).json({message: "Hech qanday kurs topilmadi"})
        }

        res.status(200).json({
            message: `${quantity} ta kurs topildi`,
            data: courses,
            quantity,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        if(!id) {
            return res.status(400).json({message: "REQ.PARAMS-ga ID biriktirilmagan"})
        }

        const course = await Course.findById(id)
        if (!course){
            return res.status(404).json({message: "Beilgan ID-ga mos kurs topilmadi"})
        }

        res.status(200).json({
            message: "Kurs topildi",
            data: course,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const updateById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id){
            return res.status(404).json({message: "Beilgan ID-ga mos kurs topilmadi"})
        }

        const { name, description, teacher, scheduledTime, phoneNumber, image } = req.body
        if(!name || !description || !teacher || scheduledTime === undefined || scheduledTime.length < 1 || !phoneNumber || !image ) {
            return res.status(400).json({message: "Barcha qatorlarni to\'ldiring"})
        }

        const existingCourse = await Course.findOne({name})
        if(existingCourse && existingCourse._id != id) {
            return res.status(400).json({message: "Bunday kurs allaqachon mavjud"})
        }

        const updatedCourse = await Course.findByIdAndUpdate(id, {name, description, teacher, scheduledTime, phoneNumber, image}, {new: true})
        if(!updatedCourse) {
            return res.status(400).json({message: "Bunday ID-ga ega kurs topilmadi"})
        }


        res.status(200).json({
            message: "Kurs muvaffaqiyatli yangilandi",
            data: updatedCourse,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const deleteById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id){
            return res.status(400).json({message: "REQ.PARAMS-ga ID biriktirilmagan"})
        }
        const foundCourse = await Course.findById(id)
        if(!foundCourse){
            return res.status(404).json({message: "Bunday ID-ga ega kurs topilmadi"})
        }

        const deletedCourse = await Course.findByIdAndDelete(id)
        if(!deletedCourse){
            return res.status(400).json({message: "Kursni o\'chirishda muammo yuz berdi. Iltimos, qaytadan urinib ko\'ring"})
        }

        res.status(200).json({
            message:  "Kurs muvaffaqiyatli o\'chirildi",
            data: deletedCourse
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

module.exports = { create, getALl, getById, updateById, deleteById }