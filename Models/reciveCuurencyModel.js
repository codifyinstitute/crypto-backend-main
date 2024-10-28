const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Symbol: {
        type: String,
        required: true,
        unique: true
    },
    Flag:{
        type:String,
        required:true
    }
});

const ReceivedCurrency = mongoose.model("ReceivedCurrency", currencySchema);
module.exports = ReceivedCurrency;