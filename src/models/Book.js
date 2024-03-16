const { Schema, model } = require("mongoose")
const { ObjectId } = Schema.Types

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: ObjectId,
        ref: "TypeOfBook",
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
})

module.exports = model("Book", bookSchema)