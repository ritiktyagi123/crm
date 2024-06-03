const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ritiktyagi01356:6rARK2XQQgiCjJTE@cluster0.vizjzge.mongodb.net/?retryWrites=true&w=majority');
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
