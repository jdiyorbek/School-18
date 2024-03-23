const { Schema, model } = require("mongoose")

const additonalLessonSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true,
    },
    scheduledTime: [
        {
            type: String,
            required: true,
        }
    ],
    phoneNumber: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = model("AdditionalLesson", additonalLessonSchema)