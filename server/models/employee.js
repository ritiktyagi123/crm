const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    state: String,
    city: String,
});

module.exports = mongoose.model('Employee', EmployeeSchema);
