const mongoose = require("mongoose");

const reviewModel = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Image:{
        type:String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Quote: {
        type: String,
        required: true
    }
})

const Review = mongoose.model("Review", reviewModel);
module.exports = Review;