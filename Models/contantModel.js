const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    MobileNo: {
        type: String
    },
    Message: {
        type: String
    },
    Status: {
        type: Boolean,
        default: false
    }
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;