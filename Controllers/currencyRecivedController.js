const Currency = require('../Models/reciveCuurencyModel');

// Add a new currency
exports.addCurrency = async (req, res) => {
    const { Name, Symbol, Flag } = req.body;
    try {
        const currency = new Currency({ Name, Symbol, Flag });
        await currency.save();
        res.status(201).json(currency);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all currencies
exports.getAllCurrencies = async (req, res) => {
    try {
        const currencies = await Currency.find();
        res.status(200).json(currencies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get currency by ID
exports.getCurrencyById = async (req, res) => {
    try {
        const currency = await Currency.findById(req.params.id);
        if (!currency) return res.status(404).json({ message: 'Currency not found' });
        res.status(200).json(currency);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update currency by ID
exports.updateCurrency = async (req, res) => {
    const { Name, Symbol, Flag } = req.body; 
    try {
        const currency = await Currency.findByIdAndUpdate(req.params.id, { Name, Symbol, Flag }, { new: true });
        if (!currency) return res.status(404).json({ message: 'Currency not found' });
        res.status(200).json(currency);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete currency by ID
exports.deleteCurrency = async (req, res) => {
    try {
        const currency = await Currency.findByIdAndDelete(req.params.id);
        if (!currency) return res.status(404).json({ message: 'Currency not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
