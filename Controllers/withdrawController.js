const Withdraw = require('../Models/withdrawModel'); // Adjust the path as needed

// Create a new withdrawal
const createWithdraw = async (req, res) => {
    try {
        const newWithdraw = new Withdraw(req.body);
        await newWithdraw.save();
        res.status(201).json(newWithdraw);
    } catch (error) {
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
        const withdrawals = await Withdraw.find({ Email:req.params.email });
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

module.exports = {
    createWithdraw,
    getAllWithdraws,
    getWithdrawById,
    updateWithdraw,
    deleteWithdraw,
    getAllByEmailWithdraws,
};
