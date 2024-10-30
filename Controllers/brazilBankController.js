const BrazilBank = require('../Models/brazilBankSchema'); // Adjust the path as necessary

// Get all records
const getAllRecords = async (req, res) => {
    try {
        const records = await BrazilBank.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get record by email
const getRecordByEmail = async (req, res) => {
    try {
        const record = await BrazilBank.find({ Email: req.params.email });
        if (!record) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new record
const createRecord = async (req, res) => {
    const newRecord = new BrazilBank(req.body);
    try {
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a record
const updateRecord = async (req, res) => {
    try {
        const updatedRecord = await BrazilBank.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecord) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a record
const deleteRecord = async (req, res) => {
    try {
        const deletedRecord = await BrazilBank.findByIdAndDelete(req.params.id);
        if (!deletedRecord) return res.status(404).json({ message: "Record not found" });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllRecords,
    getRecordByEmail,
    createRecord,
    updateRecord,
    deleteRecord,
};
