const { Schema, model } = require("mongoose")
const { ObjectId } = Schema.Types

const analyticsSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    id: {
        type: ObjectId,
        ref: "News" || "Book",
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: false,
        default: Date.now(),
    },

})

module.exports = model("Analytics", analyticsSchema)