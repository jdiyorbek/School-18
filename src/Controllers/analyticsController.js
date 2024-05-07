const Analytics = require("../models/Analytics")

const getByView = async (req, res) => {
    try {
        if(!req.query.type) {
            return res.status(400).json({message: "Iltimos, REQ.QUERY.TYPE-ga qiymat bering"})
        }

        let type = req.query.type
        let sortBy = req.query.sortBy || "mostViews"
        let fromTo = req.query.fromTo || [`${-1}`, `${Date.now()}`]
        let limit = req.query.limit || 10

        if(type !== "news" && type !== "book"){
            return res.status(400).json({message: "REQ.QUERY.TYPE-ga to\'g\'ri qiymat berilmagan"})
        }

        if(limit <= 0) {
            return res.status(400).json({message: "REQ.QUERY.LIMIT-ga kamida 1 ga teng bo\'lishi kerak"})
        }
        
        if(typeof fromTo === "string") {
            fromTo = fromTo.split(",")
        }

        if(fromTo[0] === "theOldest" || fromTo[0] === undefined || fromTo[0] === "") {
            fromTo[0] = "-1"
        }

        if(fromTo[1] === "currentTime" || fromTo[1] === undefined || fromTo[1] === "") {
            fromTo[1] = `${Date.now()}`
        }

        const data = await Analytics.find({type: type, date: {$gte: fromTo[0], $lte: fromTo[1]}}).limit(limit)

        if(data == [] || !data) {
            return res.status(200).json({message: "Hech qanday ma'lumot topilmadi"})
        }

        let processedData = {}

        for(let i = 0; i < data.length; i++){
            if (!processedData[data[i].id]) {
                processedData[data[i].id] = {
                    id: data[i].id,
                    type: data[i].type,
                    view: 1,
                }
            } else {
                processedData[data[i].id].view += 1
            }
        }
        
        processedData = Object.values(processedData)

        console.log(processedData)
        if(sortBy === "mostViews") {
            processedData.sort((a, b) => a.view - b.view).reverse()
        } else if (sortBy === "leastViews") {
            processedData.sort((a, b) => a.view - b.view)
        }
        
        res.status(200).json({
            message: "Ma'lumotlar shakllantirildi",
            data: processedData,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

const getByRegion = async (req, res) => {
    try {
        if(!req.query.type) {
            return res.status(400).json({message: "Iltimos, REQ.QUERY.TYPE-ga qiymat bering"})
        }

        let type = req.query.type
        let sortBy = req.query.sortBy || "mostVisitedCountry"
        let fromTo = req.query.fromTo || [`${-1}`, `${Date.now()}`]
        let limit = req.query.limit || 10

        if(type !== "news" && type !== "book"){
            return res.status(400).json({message: "REQ.QUERY.TYPE-ga to\'g\'ri qiymat berilmagan"})
        }
        
        if(limit <= 0) {
            return res.status(400).json({message: "REQ.QUERY.LIMIT-ga kamida 1 ga teng bo\'lishi kerak"})
        }

        if(typeof fromTo === "string") {
            fromTo = fromTo.split(",")
        }

        if(fromTo[0] === "theOldest" || fromTo[0] === undefined || fromTo[0] === "") {
            fromTo[0] = "-1"
        }

        if(fromTo[1] === "currentTime" || fromTo[1] === undefined || fromTo[1] === "") {
            fromTo[1] = `${Date.now()}`
        }

        const data = await Analytics.find({type: type, date: {$gte: fromTo[0], $lte: fromTo[1]}}).limit(limit)

        if(data == [] || !data) {
            return res.status(200).json({message: "Hech qanday ma'lumot topilmadi"})
        }

        let processedData = {}

        for(let i = 0; i < data.length; i++){
            if (!processedData[data[i].location.country]) {
                processedData[data[i].location.country] = {
                    country: data[i].location.country,
                    type: data[i].type,
                    view: 1,
                }
            } else {
                processedData[data[i].location.country].view += 1
            }
        }
        
        processedData = Object.values(processedData)

        console.log(processedData)
        if(sortBy === "mostVisitedCountry") {
            processedData.sort((a, b) => a.view - b.view).reverse()
        } else if (sortBy === "leastVisitedCountry") {
            processedData.sort((a, b) => a.view - b.view)
        }
        
        res.status(200).json({
            message: "Ma'lumotlar shakllantirildi",
            data: processedData,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

module.exports = { getByView, getByRegion }