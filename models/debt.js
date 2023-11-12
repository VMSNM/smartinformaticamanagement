const mongoose = require('mongoose')

const debtSchema = new mongoose.Schema({
    debtType: {
        type: String,
        required: true
    },
    debtDescription: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhoneNumber: Number,
    inDebtValue: Number,
    totalValue: Number,
    debtNotes: String
})

module.exports = mongoose.model('Debt', debtSchema)