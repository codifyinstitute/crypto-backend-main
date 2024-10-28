const mongoose = require("mongoose");

const depositTransactionModel = new mongoose.Schema({
    OrderId:{
        type:String,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        required:true
    },
    Amount:{
        type:Number,
        required:true
    },
    Network:{
        type:String,
        required:true
    },
    ProcessingFee:{
        type:Number,
        required:true
    },
    AddedAmount:{
        type:Number,
        required:true
    },
    Status:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Time:{
        type:String,
        required:true
    }
});

const DepositTransaction = mongoose.model("DepositTransaction", depositTransactionModel);
module.exports = DepositTransaction;