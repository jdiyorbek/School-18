const mongoose = require("mongoose")

const dbConnect = async () => {
    return mongoose
        .connect(process.env.MONGODB)
        .then(() => {
            console.log("Ulandi📚")
        })
        .catch((error) => {
            console.error("MongoDB connection error:", error);
        })

}

module.exports = dbConnect