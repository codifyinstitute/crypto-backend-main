const Static = require('../Models/staticSchema');

// Add a new static data entry
exports.addStaticData = async (req, res) => {
    try {
        const { TransactionFee, LoginId, Password, NetworkFee, MinAmount, Binance, Coinbase, Kraken, Wazirx } = req.body;

        const kraken = JSON.parse(Kraken);
        const binance = JSON.parse(Binance);
        const coinbase = JSON.parse(Coinbase);
        const wazirx = JSON.parse(Wazirx);

        const newStaticData = new Static({ TransactionFee, LoginId, Password, MinAmount, NetworkFee, Binance: binance, Coinbase: coinbase, Kraken: kraken, Wazirx: wazirx });

        await newStaticData.save();

        res.status(201).json({ message: "Static data added successfully", data: newStaticData });
    } catch (error) {
        res.status(500).json({ message: "Error adding static data", error: error.message });
    }
};

// Get all static data entries
exports.getAllStaticData = async (req, res) => {
    try {
        const staticData = await Static.find();

        res.status(200).json(staticData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving static data", error: error.message });
    }
};

// Get static data by ID
exports.getStaticDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const staticData = await Static.findById(id);

        if (!staticData) {
            return res.status(404).json({ message: "Static data not found" });
        }

        res.status(200).json(staticData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving static data", error: error.message });
    }
};

// Update static data by ID
exports.updateStaticData = async (req, res) => {
    try {
        const { id } = req.params;
        const { TransactionFee, LoginId, Password, MinAmount, NetworkFee, Binance, Coinbase, Kraken, Wazirx } = req.body;

        // If these are already objects, no need to parse them
        // If they are strings and need to be parsed, ensure they are valid JSON
        // const kraken = JSON.parse(Kraken);
        // const binance = JSON.parse(Binance);
        // const coinbase = JSON.parse(Coinbase);
        // const wazirx = JSON.parse(Wazirx);

        const updatedStaticData = await Static.findByIdAndUpdate(
            id,
            { TransactionFee, LoginId, Password, NetworkFee, MinAmount, Binance, Coinbase, Kraken, Wazirx },
            { new: true, runValidators: true }
        );

        if (!updatedStaticData) {
            return res.status(404).json({ message: "Static data not found" });
        }

        res.status(200).json({ message: "Static data updated successfully", data: updatedStaticData });
    } catch (error) {
        console.error("Error updating static data:", error); // Add logging for debugging
        res.status(500).json({ message: "Error updating static data", error: error.message });
    }
};


// Delete static data by ID
exports.deleteStaticData = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedStaticData = await Static.findByIdAndDelete(id);

        if (!deletedStaticData) {
            return res.status(404).json({ message: "Static data not found" });
        }

        res.status(200).json({ message: "Static data deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting static data", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { LoginId, Password } = req.body;
    try {
        const user = await Static.findOne({ LoginId });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.Password !== Password) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        return res.status(200).json({ message: 'Login Successful', Id: "Admin" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
