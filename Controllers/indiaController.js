const India = require('../Models/indiaSchema');
const BrazilBank = require('../Models/brazilBankSchema');
const UK = require('../Models/ukSchema'); 
const EUBank = require('../Models/euBankSchema');
const Uae = require('../Models/uaeSchema');
const UsaBank = require('../Models/usaBankSchema');

// Get all records
const getAllRecords = async (req, res) => {
    try {
        const records = await India.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get record by email
const getRecordByEmail = async (req, res) => {
    try {
        const record = await India.find({ Email: req.params.email });
        if (!record) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new record
const createRecord = async (req, res) => {
    const newRecord = new India(req.body);
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
        const updatedRecord = await India.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecord) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a record
const deleteRecord = async (req, res) => {
    try {
        const deletedRecord = await India.findByIdAndDelete(req.params.id);
        if (!deletedRecord) return res.status(404).json({ message: "Record not found" });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllCountryBank = async (req, res) => {
    try {
        const email = req.params.email;

        const [
            indiaRecord,
            usaRecord,
            ukRecord,
            aedRecord,
            euroRecord,
            brazilRecord
        ] = await Promise.all([
            India.find({ Email: email }),
            UsaBank.find({ Email: email }),
            UK.find({ Email: email }),
            Uae.find({ Email: email }),
            EUBank.find({ Email: email }),
            BrazilBank.find({ Email: email })
        ]);

        // Combine all records into one array with country names
        const allRecords = [
            ...indiaRecord.map(record => ({ ...record.toObject(), Country: "India" })),
            ...usaRecord.map(record => ({ ...record.toObject(), Country: "United States of America" })),
            ...ukRecord.map(record => ({ ...record.toObject(), Country: "United Kingdom" })),
            ...aedRecord.map(record => ({ ...record.toObject(), Country: "Dubai" })),
            ...euroRecord.map(record => ({ ...record.toObject(), Country: "European Union" })),
            ...brazilRecord.map(record => ({ ...record.toObject(), Country: "Brazil" }))
        ];

        // console.log(allRecords);

        // Optionally, send the combined records as a response
        res.json(allRecords);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching bank records.' });
    }
};


module.exports = {
    getAllRecords,
    getRecordByEmail,
    createRecord,
    updateRecord,
    deleteRecord,
    getAllCountryBank,
};
