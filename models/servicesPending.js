const mongoose = require('mongoose')

const servicesPendingSchema = new mongoose.Schema({
    serviceDescription: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhoneNumber: Number,
    price: Number,
    serviceNotes: String
})

module.exports = mongoose.model('ServicesPending', servicesPendingSchema)