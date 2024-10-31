const Wallet = require('../Models/walletModel'); // Adjust the path as needed

// Create or update a wallet
const createOrUpdateWallet = async (req, res) => {
    try {
        const { Email, Amount, PendingAmount } = req.body;
        const wallet = await Wallet.findOneAndUpdate(
            { Email },
            { Amount, PendingAmount },
            { new: true, upsert: true } // Create a new wallet if it doesn't exist
        );
        res.status(201).json(wallet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all wallets
const getAllWallets = async (req, res) => {
    try {
        const wallets = await Wallet.find();
        res.status(200).json(wallets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get wallet by Email
const getWalletByEmail = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ Email: req.params.email });
        if (!wallet) {
            const wallet = new Wallet({ Email: req.params.email, Amount: 0, PendingAmount: 0 });
            await wallet.save();
            return res.status(200).json(wallet);
        }
        res.status(200).json(wallet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update wallet by Email
const updateWalletByEmail = async (req, res) => {
    try {
        const wallet = await Wallet.findOneAndUpdate({ Email: req.params.email }, req.body, { new: true });
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }
        res.status(200).json(wallet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete wallet by Email
const deleteWalletByEmail = async (req, res) => {
    try {
        const wallet = await Wallet.findOneAndDelete({ Email: req.params.email });
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrUpdateWallet,
    getAllWallets,
    getWalletByEmail,
    updateWalletByEmail,
    deleteWalletByEmail,
};
