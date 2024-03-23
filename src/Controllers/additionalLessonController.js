const AdditionalLesson = require("../models/AdditionalLesson")

const create = async (req, res) => {
    try {
        const { name, description, teacher, scheduledTime, phoneNumber, image } = req.body
        if(!name || !description || !teacher || scheduledTime === undefined || scheduledTime.length < 1 || !phoneNumber || !image) {
            return res.status(400).json({message: "Barcha qatorlarni to\'ldiring"})
        }

        const existingName = await AdditionalLesson.findOne({name})
        if(existingName) {
            return res.status(400).json({message: "Bunday nom allaqachon mavjud"})
        }

        const createdAdditionalLesson = await AdditionalLesson.create({name, description, teacher, scheduledTime, phoneNumber, image})
        if(!createdAdditionalLesson) {
            return res.status(400).json({message: "To\'garak yaratishda xatolik yuz berdi"})
        }

        res.status(201).json({
            message: "To\'garak muvaffaqiyatli yaratildi",
            data: createdAdditionalLesson,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const getAll = async (req, res) => {
    try {
        const additionalLessons = await AdditionalLesson.find()

        if(additionalLesson.length === 0) {
            return res.status(200).json({message: "Hech qanday to'garak topilmadi"})
        }

        res.status(200).json({
            message: "To'garaklar topildi",
            data: additionalLessons,
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
            return res.status(400).json({message: "REQ.PARAMS-ga ID biriktiring"})
        }

        const foundAdditionalLesson = await AdditionalLesson.findById(id)
        if(!foundAdditionalLesson) {
            return res.status(404).json({message: "Bunday ID-ga ega to\'garak topilmadi"})
        }

        res.status(200).json({
            message: "To\'garak topildi",
            data: foundAdditionalLesson,
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const updateById = async (req, res) => {
    try {
        const { id } = req.params
        if(!id) {
            return res.status(400).json({message: "REQ.PARAMS-ga ID biriktiring"})
        }

        const { name, description, teacher, scheduledTime, phoneNumber, image } = req.body
        if(!name || !description || !teacher || scheduledTime == [] || scheduledTime === undefined || !phoneNumber || !image) {
            return res.status(400).json({message: "Barcha qatorlarni to\'ldiring"})
        }

        const foundAdditionalLesson = await AdditionalLesson.findById(id)
        if(!foundAdditionalLesson) {
            return res.status(404).json({message: "Bunday ID-ga ega to\'garak topilmadi"})
        }

        const updatedAdditionalLesson = await AdditionalLesson(id, {name, description, teacher, scheduledTime, phoneNumber, image})
        if(!updatedAdditionalLesson) {
            return res.status(400).json({message: "To\'garakni yangilashda xatolik yuz berdi"}, {new: true})
        }

        res.status(200).json({
            message: "To\'garak muvaffaqiyatli yangilandi",
            data: updatedAdditionalLesson,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const deleteById = async (req, res) => {
    try {
        const { id } = req.params
        if(!id) {
            return res.status(400).json({message: "REQ.PARAMS-ga ID biriktiring"})
        }

        const deletedAdditionalLesson = await AdditionalLesson(id)
        if(!deletedAdditionalLesson) {
            return res.status(400).json({message: "To\'garakni o\'chirishda muammo yuz berdi"})
        }

        res.status(200).json({
            message: "To\'garak muvaffaqiyatli o\'chirildi",
            data: deletedAdditionalLesson,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

module.exports = { create, getAll, getById, updateById, deleteById }