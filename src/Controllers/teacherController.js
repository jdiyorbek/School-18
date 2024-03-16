const Teacher = require("../models/Teacher")

const addTeacher = async (req, res) => {
    try {
        const { firstName, lastName, middleName, about, position, description } = req.body
        if(!firstName || !lastName || !middleName || !about || !position || !description) {
            return res.status(400).json({message: "Barcha qatorlarni to\'ldiring"})
        }

        const addedTeacher = await Teacher.create({firstName, lastName, middleName, about, position, description})
        if(!addedTeacher) {
            return res.status(400).json({message: "O\'qituvchi qo\'shishda xatolik yuz berdi"})
        }

        res.status(201).json({
            message: "O\'qituvchi muvaffaqiyatli qo\'shildi",
            data: addedTeacher,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const getAll = async (req, res) => {
    try {
        let sortBy = req.query.sortBy || "firstSeniorPosition"
        let positionStructure = ["Direktor", "Direktor o\'rinbosari", "O\'qituvchi"]
        let position = req.query.position || positionStructure.toString()
        let page = req.query.page || 1
        let limit = req.query.limit || 10

        let sort
        if(sortBy === "firstSeniorPosition"){
            sort = 1
        } else if(sortBy === "firstLowerPosition") {
            sort = -1
        }

        if(typeof position !== "Array") {
            position = position.split(",")
        }

        const foundTeacher = await Teacher.find({position: {$in: [...position]}}).sort({position: sort}).limit(limit).skip(limit * (page - 1))
        const quantity = await Teacher.find({position: {$in: [...position]}}).count()
        if (!foundTeacher) {
            return res.status(400).json({message: "O\'qituvchilarni topishda xatolik yuz berdi"})
        }

        res.status(200).json({
            message: "O\'qituvchi topildi",
            data: foundTeacher,
            pagination: {
                activePage: page,
                totalPages: +(quantity / limit).toFixed(0),
            }
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
            return res.status(400).json({message: "REQ.PARAMS-ga ID birikrilmagan"})
        }

        const { firstName, lastName, middleName, about, position, description } = req.body
        if(!firstName || !lastName || !middleName || !about || !position || !description) {
            return res.status(400).json({message: "Barcha qatorlarni to\'ldiring"})
        }

        const updatedTeacher = await Teacher.findByIdAndUpdate(id, {firstName, lastName, middleName, about, position, description}, {new: true})
        if(!updatedTeacher) {
            return res.status(400).json({message: "O\'qituvchini yangilashda xatolik yuz berdi"})
        }

        res.status(200).json({
            message: "O\'qituvchi muvaffaqiyatli yangilandi",
            data: updatedTeacher,
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
            return res.status(400).json({message: "REQ.PARAMS-ga ID birikrilmagan"})
        }
        const deletedTeacher = await Teacher.findByIdAndDelete(id)
        if(!deletedTeacher) {
            return res.status(400).json({message: "O\'qituvchini o\'chirishda xatolik yuz berdi"})
        }

        res.status(200).json({
            message: "O\'qituvchi muvaffaqiyatli o\'chirildi",
            data: deletedTeacher,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

module.exports = { addTeacher, getAll, updateById, deleteById }