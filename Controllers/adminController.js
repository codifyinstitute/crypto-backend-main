const Admin = require('../Models/adminModel'); // Adjust the path as needed

// Create a new admin
const createAdmin = async (req, res) => {
    try {
        const newAdmin = new Admin(req.body);
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get admin by ID
const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update admin
const updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete admin
const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { LoginId, Password } = req.body;
    console.log({ LoginId, Password })
    try {
        const user = await Admin.findOne({ LoginId });
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

module.exports = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    loginUser
};
