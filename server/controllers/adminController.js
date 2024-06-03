const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin Registration
exports.registerAdmin = async (req, res) => {
    const { email, username, password, status } = req.body;
    try {
        let admin = await Admin.findOne({ email });
        if (admin) return res.status(400).json({ msg: 'Admin already exists' });

        admin = new Admin({ email, username, password, status });

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);
        await admin.save();

        const payload = { admin: { id: admin.id } };
        jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        let admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = { admin: { id: admin.id } };
        jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Get Admin Info
exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        res.json(admin);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
