const Event = require("../models/Event")
const events = require("events");

const create = async (req, res) => {
    try {
        const { title, description, image, scheduledAt } = req.body
        if(!title || !description || !image || !scheduledAt) {
            return res.status(400).json({message: "Barcha qatorlarni to\'ldiring"})
        }
        const date = Date.parse(scheduledAt)
        if(!date) {
            return res.status(400).json({message: "Vaqt xato kiritilgan"})
        }

        const createdEvent = await Event.create({title, description, image, scheduledAt: date})
        if(!createdEvent) {
             return res.status(400).json({message: "Tadbir yaratishda xatolik yuz berdi"})
        }

        res.status(200).json({
            message: "Tadbir muvaffaqiyatli yaratildi",
            data: createdEvent,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const getAll = async (req, res) => {
    try {
        const foundEvent = await Event.find()
        if(foundEvent.length === 0) {
            return res.status(400).json({message: "Hech qanday tadbir topilmadi"})
        }

        res.status(200).json({
            message: "Tadbirlar topildi",
            data: foundEvent
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
            return res.status(404).json({message: "Beilgan ID-ga mos tadbir topilmadi"})
        }

        const { title, description, image, scheduledAt } = req.body
        if(!title || !description || !image || !scheduledAt) {
            return res.status(400).json({message: "Barcha qatorlarni to\'ldiring"})
        }
        const date = Date.parse(scheduledAt)
        if(!date) {
            return res.status(400).json({message: "Vaqt xato kiritilgan"})
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, {title, description, image, scheduledAt})
        if(!updatedEvent) {
            return res.status(400).json({message: "Tadbirni yangilashda xatolik yuz berdi"})
        }

        res.status(200).json({
            message: "Tadbir muvaffaqiyatli yangilandi",
            data: updatedEvent,
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
            return res.status(404).json({message: "Beilgan ID-ga mos tadbir topilmadi"})
        }

        const deletedEvent = await Event.findByIdAndDelete(id)
        if(!deletedEvent) {
            return res.status(400).json({message: "Tadbirni o\'chirishda xatolik yuz berdi"})
        }

        res.status(200).json({
            message: "Tadbir muvaffaqiyatli o\'chirildi",
            data: deletedEvent,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

module.exports = { create, getAll, updateById, deleteById }