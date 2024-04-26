const Analytics = require("../models/Analytics")

const getByView = async (req, res) => {
    try {
        if(!req.query.type) {
            return res.status(400).json({message: "Iltimos, REQ.QUERY.TYPE-ga qiymat bering"})
        }

        let type = req.query.type
        let sortBy = req.query.sortBy || "mostViews"

        if(type !== "news" && type !== "book"){
            return res.status(400).json({message: "REQ.QUERY.TYPE-ga to\'g\'ri qiymat berilmagan"})
        }

        const data = await Analytics.find({type: type})

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
        
        console.log(processedData)
        res.status(200).json({
            message: "Ma'lumotlar shakllantirildi",
            data: data,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Serverda ichki xatolik"})
    }
}

module.exports = { getByView }