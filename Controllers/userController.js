const User = require('../Models/userSchema'); // Adjust the path as necessary
const { generateOTP, sendOTPEmail } = require('../Utils/otpUtils'); // Adjust the path as necessary
const fs = require('fs');
const path = require('path');

// Signup with OTP
exports.signup = async (req, res) => {
    try {
        const { Email, MobileNo } = req.body;

        // Check if the email already exists
        let user = await User.findOne({ Email, MobileNo });

        if (user) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Generate OTP and expiration time
        const otp = generateOTP();
        const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

        // Create user with email and OTP
        user = new User({ Email, OTP: otp, OTPExpires: otpExpires });

        await user.save();

        // Send OTP email
        await sendOTPEmail(Email, otp);

        res.status(200).json({ message: "OTP sent to email. Please verify to complete signup." });
    } catch (error) {
        res.status(500).json({ message: "Error during signup", error: error.message });
    }
};

// Verify OTP and complete signup
exports.verifyOTP = async (req, res) => {
    try {
        const { Email, OTP } = req.body;

        const user = await User.findOne({ Email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or OTP" });
        }

        // Check if OTP is valid and not expired
        if (user.OTP === OTP && user.OTPExpires > Date.now()) {
            // Clear OTP fields after successful verification
            user.OTP = undefined;
            user.OTPExpires = undefined;

            await user.save();

            res.status(200).json({ message: "Signup complete" });
        } else {
            res.status(400).json({ message: "Invalid or expired OTP" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error verifying OTP", error: error.message });
    }
};

// Login with OTP
exports.login = async (req, res) => {
    try {
        const { Email, MobileNo } = req.body;

        let user = await User.findOne({ Email });

        if (!user) {
            // Email not registered, initiate signup
            const otp = generateOTP();
            const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

            user = new User({ Email, MobileNo, Profile: "Icon.jpg", OTP: otp, OTPExpires: otpExpires });

            await user.save();

            await sendOTPEmail(Email, otp);

            return res.status(200).json({ message: "Email not registered. OTP sent to email for signup." });
        }


        // Generate and send OTP for login
        const otp = generateOTP();
        user.OTP = otp;
        user.OTPExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

        await user.save();

        await sendOTPEmail(Email, otp);

        res.status(200).json({ message: "OTP sent to email. Please verify to login." });
    } catch (error) {
        res.status(500).json({ message: "Error during login", error: error.message });
        console.log(error);
    }
};

// Verify OTP and login
exports.verifyLoginOTP = async (req, res) => {
    try {
        const { Email, OTP } = req.body;

        const user = await User.findOne({ Email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or OTP" });
        }

        // Check if OTP is valid and not expired
        if (user.OTP === OTP && user.OTPExpires > Date.now()) {
            // Clear OTP fields after successful verification
            user.OTP = undefined;
            user.OTPExpires = undefined;

            await user.save();

            res.status(200).json({ message: "Login successful", token: user.Email });
        } else {
            res.status(400).json({ message: "Invalid or expired OTP" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error verifying OTP", error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error: error.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const { emailId } = req.params;
        const user = await User.findOne({ Email: emailId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error: error.message });
        console.log(error);
    }
};

// Update user by adding or updating an account
exports.addOrUpdateAccount = async (req, res) => {
    try {
        const { emailId } = req.params;
        const accountData = req.body;

        const user = await User.findOne({ Email: emailId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the account already exists based on account number
        const accountIndex = user.Accounts.findIndex(account => account.AccountNumber === accountData.AccountNumber);

        if (accountIndex !== -1) {
            // Update existing account
            user.Accounts[accountIndex] = accountData;
        } else {
            // Add new account
            user.Accounts.push(accountData);
        }

        await user.save();

        res.status(200).json({ message: "Account added/updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

// Delete an account from a user
exports.deleteAccount = async (req, res) => {
    try {
        const { emailId, accountNumber } = req.params;

        const user = await User.findOne({ Email: emailId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.Accounts = user.Accounts.filter(account => account.AccountNumber !== accountNumber);

        await user.save();

        res.status(200).json({ message: "Account deleted successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error deleting account", error: error.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { emailId } = req.params;

        const deletedUser = await User.findOneAndDelete({ Email: emailId });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};


exports.updateProfilePicture = async (req, res) => {
    const userId = req.params.email;

    try {
        const user = await User.findOne({ Email: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the current profile picture is not the default
        if (user.Profile !== 'Icon.jpg') {
            const oldImagePath = path.join(__dirname, '../uploads', user.Profile);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Update user's profile picture
        user.Profile = req.file.filename; // Store new image name in the database
        await user.save();

        res.json({ message: 'Profile picture updated successfully', profilePicture: user.Profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};