const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    OrderId:{
        type:String,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        required:true
    },
    Country:{
        type:String,
        required:true
    },
    AccountDetail:{
        type:Object
    },
    USDTAmount:{
        type:Number,
        required:true
    },
    Token:{
        type:String,
        required:true
    },
    ProcessingFee:{
        type:Number,
        required:true
    },
    NetworkFee:{
        type:Number,
        required:true
    },
    ReceivedAmount:{
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

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;