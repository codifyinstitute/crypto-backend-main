const Contact = require('../Models/contantModel'); // Adjust path as needed
const nodemailer = require('nodemailer');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'otp.moonpay@gmail.com',
        pass: 'bbefvmhxcualzlzn'
    }
});

// Send email function
const sendEmail = async (contact) => {
    const mailOptions = {
        from: 'otp.moonpay@gmail.com',
        to: 'otp.moonpay@gmail.com',
        subject: 'New Contact Form Submission',
        text: `You have a new contact form submission:

        Name: ${contact.Name}
        Email: ${contact.Email}
        MobileNo: ${contact.MobileNo}
        Message: ${contact.Message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Add a new contact and send email
exports.addContact = async (req, res) => {
    try {
        const { Name, Email, MobileNo, Message } = req.body;
        const newContact = new Contact({ Name, Email, MobileNo, Message });
        await newContact.save();
        
        // Send email notification
        await sendEmail(newContact);

        res.status(201).json({ message: 'Contact added successfully', contact: newContact });
    } catch (error) {
        res.status(500).json({ message: 'Error adding contact', error });
    }
};

// Get all contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error });
    }
};

// Delete a contact by ID
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Contact.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contact', error });
    }
};

// Update contact status by ID
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { Status } = req.body;
        const updatedContact = await Contact.findByIdAndUpdate(id, { Status }, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact status updated successfully', contact: updatedContact });
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact status', error });
    }
};