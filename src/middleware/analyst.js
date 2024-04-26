const Analytics = require("../models/Analytics")
const News = require("../models/News")
const Book = require("../models/Book")

module.exports = analyst = async (req, res, next) => {
    try {
        let urlArr = req.originalUrl.split("/")
        if(urlArr[1] === "api" && urlArr[2] === "news" && urlArr[3] !== undefined) {
            const ip = req.headers["x-real-ip"] || req.socket.remoteAddress || "0.0.0.0"
            const foundNews = await News.findById(urlArr[3])
            if(foundNews) {
                await Analytics.create({type: "news", id: urlArr[3], ipAddress: ip})
            }
        }

        if(urlArr[1] === "api" && urlArr[2] === "library" && urlArr[3] !== undefined) {
            const ip = req.headers["x-real-ip"] || req.socket.remoteAddress || "0.0.0.0"
            const foundNews = await Book.findById(urlArr[3])
            if(foundNews) {
                await Analytics.create({type: "book", id: urlArr[3], ipAddress: ip})
            }
        }
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}