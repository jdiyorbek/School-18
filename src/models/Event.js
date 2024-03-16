const { model, Schema } = require("mongoose");

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    scheduledAt: {
        type: Date,
        required: true,
    }
})

module.exports = model("Event", eventSchema)