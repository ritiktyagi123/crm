const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admin', AdminSchema);
