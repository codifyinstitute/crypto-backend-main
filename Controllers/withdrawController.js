const Withdraw = require('../Models/withdrawModel'); // Adjust the path as needed
const Wallet = require('../Models/walletModel');


// Create a new withdrawal
const createWithdraw = async (req, res) => {
    try {
        var wallet = await Wallet.findOne({ Email: req.body.Email });
        wallet.Amount -= req.body.WithdrawAmount;
        wallet.PendingAmount = req.body.WithdrawAmount;
        const newWithdraw = new Withdraw(req.body);
        await newWithdraw.save();
        await wallet.save();
        res.status(201).json(newWithdraw);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};

// Get all withdrawals
const getAllWithdraws = async (req, res) => {
    try {
        const withdrawals = await Withdraw.find();
        res.status(200).json(withdrawals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllByEmailWithdraws = async (req, res) => {
    try {
        const withdrawals = await Withdraw.find({ Email: req.params.email });
        res.status(200).json(withdrawals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get withdrawal by ID
const getWithdrawById = async (req, res) => {
    try {
        const withdraw = await Withdraw.findById(req.params.id);
        if (!withdraw) {
            return res.status(404).json({ message: 'Withdrawal not found' });
        }
        res.status(200).json(withdraw);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update withdrawal
const updateWithdraw = async (req, res) => {
    try {
        const withdraw = await Withdraw.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!withdraw) {
            return res.status(404).json({ message: 'Withdrawal not found' });
        }
        res.status(200).json(withdraw);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete withdrawal
const deleteWithdraw = async (req, res) => {
    try {
        const withdraw = await Withdraw.findByIdAndDelete(req.params.id);
        if (!withdraw) {
            return res.status(404).json({ message: 'Withdrawal not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const Reject = async (req, res) => {
    const { amount } = req.body;
    try {
        const transaction = await Withdraw.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        var wallet = await Wallet.findOne({ Email: transaction.Email });
        wallet.Amount += Number(amount);
        wallet.PendingAmount -= Number(amount);
        transaction.Status = "Failed";
        await transaction.save();
        await wallet.save();
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error)
    }
};

module.exports = {
    createWithdraw,
    getAllWithdraws,
    getWithdrawById,
    updateWithdraw,
    deleteWithdraw,
    getAllByEmailWithdraws,
    Reject
};
