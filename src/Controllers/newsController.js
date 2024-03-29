const News = require("../models/News")

const create = async (req, res) => {
    try{
        const { title, description, text, image, isPublic } = req.body
        if(!title || !description || !text || !image || isPublic === undefined) {
            return res.status(400).json({message: "Barcha qatorlarni to\'ldiring"})
        }

        const newNews = new News({
            title, description, text, image, isPublic
        })

        const createdNews = await newNews.save()

        if(!createdNews){
            return res.status(400).json({message: "Yangilik chop etishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring"})
        }
        res.status(201).json({
            message: "Yangilik muvaffaqiyatli chop etildi.",
            data: createdNews,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const getAll = async (req, res) => {
    try {
        const limit = req.query.limit || 10
        const page = req.query.page || 1
        const news = await News.find().limit(limit).skip(limit * (page - 1))
        const quantity = await News.find().count()
        if(news.length === 0){
            return res.status(200).json({message: "So\'rovga mos yangilik topilmadi"})
        }
        res.status(200).json({
            message: `${news.length} ta yangilik topildi`,
            data: news,
            quantity: +news.length,
            totalQuantity: quantity,
            pagination: {
                activePage: page,
                totalPage: +(quantity / limit).toFixed(0)
            }
        })
    }catch (err) {
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
        const news = await News.findById(id)
        if(!news) {
            return res.status(404).json({message: "Bunday ID-ga ega yangilik topilmadi"})
        }
        res.status(200).json({
            message: "Yangilik topildi",
            data: news
        })
    }catch (err) {
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

        const { title, description, text, image, isPublic } = req.body
        if(!title || !description || !text || !image || isPublic === undefined) {
            return res.status(400).json({message: "Barcha qatorlarni to\'ldiring"})
        }

        const foundNews = await News.findById(id)
        if(!foundNews) {
            return res.status(404).json({message: "Bunday ID-ga ega yangilik topilmadi"})
        }

        const updatedNews = await News.findByIdAndUpdate(id, {title, description, text, image, isPublic})
        if(!updatedNews){
            return res.status(400).json({message: "Ma\'lumotlar yangilanishida xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring"})
        }
        res.status(200).json({
            message: "Ma\'lumotlar muvaffaqiyatli yangilandi",
            data: updatedNews,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const deleteById = async (req, res) => {
    try {
        const { id } = req.params
        if(!id){
            return res.status(400).json({message: "REQ.PARAMS-ga ID biriktiring"})
        }

        const deletedNews = await News.findByIdAndDelete(id)
        if(!deletedNews){
            return res.status(400).json({message: "Bunday ID-ga ega yangilik topilmadi"})
        }

        res.status(200).json({message: "Yangilik muvaffaqiyatli o\'chirildi"})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

module.exports = {create, getAll, getById, updateById, deleteById}