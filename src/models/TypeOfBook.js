const { Schema, model } = require("mongoose")

const typeOfBookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
})

module.exports = model("TypeOfBook", typeOfBookSchema)