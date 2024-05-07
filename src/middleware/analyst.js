const Analytics = require("../models/Analytics")
const News = require("../models/News")
const Book = require("../models/Book")
const geoip = require('geoip-country')

module.exports = analyst = async (req, res, next) => {
    try {
        let urlArr = req.originalUrl.split("/")
        if(urlArr[1] === "api" && urlArr[2] === "news" && urlArr[3] !== undefined) {
            const ip = req.headers["x-real-ip"] || req.socket.remoteAddress || "0.0.0.0"
            const location = geoip.lookup(ip) || { range: [ 0, 0 ], country: 'Unknown' }
            const foundNews = await News.findById(urlArr[3])
            if(foundNews) {
                await Analytics.create({type: "news", id: urlArr[3], location: {ipAddress: ip, country: location.country}})
            }
        }

        if(urlArr[1] === "api" && urlArr[2] === "library" && urlArr[3] !== undefined) {
            const ip = req.headers["x-real-ip"] || req.socket.remoteAddress || "0.0.0.0"
            const location = geoip.lookup(ip) || { range: [ 0, 0 ], country: 'Unknown' }
            const foundBook = await Book.findById(urlArr[3])
            if(foundBook) {
                await Analytics.create({type: "book", id: urlArr[3], location: {ipAddress: ip, country: location.country}})
            }
        }
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}