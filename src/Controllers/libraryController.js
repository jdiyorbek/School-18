const Book = require("../models/Book")
const TypeOfBook = require("../models/TypeOfBook")

const publishBook = async (req, res) => {
    try {
        const { name, type, image, file } = req.body
        if(!name || !type || !image || !file){
            return res.status(400).json({message: "Barcha qatorlarni to\'ldiring"})
        }

        const existingBook = await Book.findOne({name})
        if(existingBook){
            return res.status(400).json({message: "Bunday kitob nomi allaqchon foydalanilgan"})
        }

        const foundType = await TypeOfBook.findOne({name: type})
        let typeId
        if(!foundType) {
            const createdType = await TypeOfBook.create({name: type})
            if(!createdType){
                return res.status(400).json({message: "Kitob turi bilan bog'liq xatolik yuz berdi"})
            }
            typeId = createdType._id
        }else{
            typeId = foundType._id
        }
        const newBook = await Book.create({
            name, type: typeId, image, file
        })

        res.status(200).json({
            message: "Kitob muvaffaqiyatli chop etildi",
            data: newBook,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const getAll = async (req, res) => {
    try {
        let limit = req.query.limit || 10
        let page = req.query.page || 1
        let type = req.query.type || "All"
        const bookTypes = await TypeOfBook.find()

        if(type === "All"){
            type = [...bookTypes].map((type) => type._id)
        }else{
            type = bookTypes.filter(btype => btype.name === type).map(type => type._id)
        }

        const books = await Book.find({type: {$in: [...type]}}).limit(limit).skip(limit * (page - 1)).populate("type", "name")
        const quantity = await Book.find({type: {$in: [...type]}}).populate("type", "name").count()

        if(!books){
            return res.status(400).json({message: "Kitoblarni topishda xatolik yuz berdi"})
        }

        res.status(200).json({
            message: "Kitoblar muvaffaqiyatli topildi",
            data: {
                books,
                typeOfBooks: bookTypes
            },
            quantity: +books.length,
            totalQuantity: quantity,
            pagination: {
                activePage: page,
                totalPage: +(quantity / limit).toFixed(0)
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        if(!book){
            return res.status(400).json({message: "Bunday ID-ga ega kitob topilmadi"})
        }
        res.status(200).json({
            message: "Kitob topildi",
            data: book,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const deleteById = async (req, res) => {
    try {
        const { id } = req.params
        if(!id){
            return res.status(400).json({message: "REQ.PARAMS-da ID-da biriktirilmagan"})
        }

        const deletedBook = await Book.findByIdAndDelete(id)
        if(!deletedBook) {
            return res.status(400).json({message: "Bunday ID-ga ega kitob topilmadi"})
        }

        const checkBookTypes = await Book.find({type: deletedBook.type}).count()
        if(checkBookTypes === 0) {
            await TypeOfBook.findByIdAndDelete(deletedBook.type)
        }

        res.status(200).json({
            message: "Kitob muvaffaqiyatli o\'chirildi",
            data: deletedBook,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

module.exports = {publishBook, getAll, getById, deleteById}