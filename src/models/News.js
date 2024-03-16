const { Schema, model } = require("mongoose")

const newsSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        required: false,
        default: false,
    },
    views: {
        type: Number,
        deafult: 0,
    },
    
}, { timestamps: true })

module.exports = model("News", newsSchema);