const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Count: {
        type: Number,
        required: true
    }
});

const Counter = mongoose.model("Counter", counterSchema);
module.exports = Counter;