const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    type: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    montant: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    note: { type: String },
    methode: { type: String, required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);