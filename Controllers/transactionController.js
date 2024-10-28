const moment = require('moment');
const Counter = require('../Models/counterSchema');
const Transaction = require('../Models/transactionSchema');

// Utility function to generate a random 10-digit number
function generateOrderId() {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// Utility function to generate a 10-digit unique OrderId
async function generateUniqueOrderId() {
    let isUnique = false;
    let orderId;

    while (!isUnique) {
        orderId = generateOrderId();
        const existingTransaction = await Transaction.findOne({ OrderId: orderId });
        if (!existingTransaction) {
            isUnique = true;
        }
    }

    return orderId;
}

// Add a new transaction with a unique 10-digit OrderId
exports.addTransaction = async (req, res) => {
    try {
        var id;
        const { TransactionId, Email, Name, Country, BankName, AccountNumber, IFSC, USDTAmount, Token, ProcessingFee, ReceivedAmount, NetworkFee } = req.body;

        let counter = await Counter.findOne({ Title: `Transaction` });

        if (!counter) {
            counter = new Counter({ Title: `Transaction`, Count: 1 });
        } else {
            counter.Count += 1;
        }

        
        id = `15300990${counter.Count}`;
        const currentDate = moment().format('DD-MM-YYYY'); // Current date in 'YYYY-MM-DD' format
        const currentTime = moment().format('HH:mm:ss');   // Current time in 'HH:mm:ss' format
        
        const newTransaction = new Transaction({
            OrderId: id,
            TransactionId,
            Email,
            Name,
            Country,
            BankName,
            AccountNumber,
            IFSC,
            USDTAmount,
            Token,
            ProcessingFee,
            NetworkFee,
            ReceivedAmount,
            Status: "Pending",
            Date: currentDate,
            Time: currentTime
        });
        
        await newTransaction.save();
        await counter.save();
        
        res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });
    } catch (error) {
        res.status(500).json({ message: "Error adding transaction", error: error.message });
        console.log(error)
    }
};

// Get all transactions 
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving transactions", error: error.message });
    }
};

// Get a transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving transaction", error: error.message });
    }
};

// Get a transaction by Email
exports.getTransactionByEmail = async (req, res) => {
    try {
        const { Email } = req.params;
        const transaction = await Transaction.find({ Email });

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving transaction", error: error.message });
    }
};

// Update a transaction by ID
exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { OrderId, TransactionId, Email, Name, Country, BankName, AccountNumber, IFSC, USDTAmount, Token, ProcessingFee, ReceivedAmount, NetworkFee, Status } = req.body;

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            { OrderId, TransactionId, Email, Name, Country, BankName, AccountNumber, IFSC, USDTAmount, Token, ProcessingFee, ReceivedAmount, NetworkFee, Status },
            { new: true, runValidators: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction updated successfully", transaction: updatedTransaction });
    } catch (error) {
        res.status(500).json({ message: "Error updating transaction", error: error.message });
    }
};

// Delete a transaction by ID
exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting transaction", error: error.message });
    }
};


// Get a Order count by ID
exports.getCountById = async (req, res) => {
    try {
        const  id = "66d68d90822524eed39e7611";
        const Count = await Counter.findById(id);

        if (!Count) {
            return res.status(404).json({ message: "Count not found" });
        }

        res.status(200).json(Count);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Count", error: error.message });
    }
};
