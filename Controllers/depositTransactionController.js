const DepositTransaction = require('../Models/depositTransactionModel');
const Counter = require('../Models/counterSchema');
const moment = require('moment');


function generateOrderId() {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// Utility function to generate a 10-digit unique OrderId
async function generateUniqueOrderId() {
    let isUnique = false;
    let orderId;

    while (!isUnique) {
        orderId = generateOrderId();
        const existingTransaction = await DepositTransaction.findOne({ OrderId: orderId });
        if (!existingTransaction) {
            isUnique = true;
        }
    }

    return orderId;
}



// Add a new deposit transaction
exports.addDepositTransaction = async (req, res) => {

    try {

        // var id;
        const { Email, Amount, Network, ProcessingFee, AddedAmount, Status, Date, Time } = req.body;
        let counter = await Counter.findOne({ Title: `DepositTransaction` });

        if (!counter) {
            counter = new Counter({ Title: `DepositTransaction`, Count: 1 });
        } else {
            counter.Count += 1;
        }


        // id = `15300990${counter.Count}`;
        const id = await generateUniqueOrderId();
        const currentDate = moment().format('DD-MM-YYYY'); // Current date in 'YYYY-MM-DD' format
        const currentTime = moment().format('HH:mm:ss');   // Current time in 'HH:mm:ss' format

        const transaction = new DepositTransaction({ OrderId: id, Email, Amount, Network, Status, Date, Time });
        await transaction.save();
        await counter.save();
        res.status(201).json({ transaction });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all deposit transactions
exports.getAllDepositTransactions = async (req, res) => {
    try {
        const transactions = await DepositTransaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get deposit transaction by ID
exports.getDepositTransactionById = async (req, res) => {
    try {
        const transaction = await DepositTransaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// for getting deposut history via emailid
exports.getDepositTransactionByEmail = async (req, res) => {
    try {
        const { Email } = req.params;
        const transaction = await DepositTransaction.find({ Email });

        if (!transaction) {
            return res.status(404).json({ message: "Deposit history not found" });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Deposit history ", error: error.message });
    }
};

// Update deposit transaction by ID
exports.updateDepositTransaction = async (req, res) => {
    const { OrderId, Email, Amount, Network, Status, Date, Time } = req.body;
    try {
        const transaction = await DepositTransaction.findByIdAndUpdate(req.params.id, { OrderId, Email, Amount, Network, ProcessingFee, AddedAmount, Status, Date, Time }, { new: true });
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};``

// Delete deposit transaction by ID
exports.deleteDepositTransaction = async (req, res) => {
    try {
        const transaction = await DepositTransaction.findByIdAndDelete(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
