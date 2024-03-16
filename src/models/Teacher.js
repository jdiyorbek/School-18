const { model, Schema } = require("mongoose")

const teacherSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
        enum: ["Direktor", "Direktor o\'rinbosari", "O\'qituvchi"],
    },
    description: {
        type: String,
        required: true,
    },
})

module.exports = model("Teacher", teacherSchema)