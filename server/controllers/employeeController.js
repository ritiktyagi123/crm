const Employee = require('../models/employee');

// Insert Employee
exports.addEmployee = async (req, res) => {
    const { firstName, lastName, email, mobile, state, city } = req.body;
    try {
        const newEmployee = new Employee({ firstName, lastName, email, mobile, state, city });
        await newEmployee.save();
        res.json(newEmployee);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Employee deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
    const { firstName, lastName, email, mobile, state, city } = req.body;
    try {
        let employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ msg: 'Employee not found' });
        employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: { firstName, lastName, email, mobile, state, city } },
            { new: true }
        );
        res.json(employee);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Search Employee
exports.searchEmployee = async (req, res) => {
    try {
        const employees = await Employee.find({ firstName: new RegExp(req.query.name, 'i') });
        res.json(employees);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Get All Employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
