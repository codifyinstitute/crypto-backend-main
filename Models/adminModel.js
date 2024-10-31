const mongoose = require("mongoose");

const adminModel = new mongoose.Schema({
    LoginId: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model("Admin", adminModel);
module.exports = Admin;