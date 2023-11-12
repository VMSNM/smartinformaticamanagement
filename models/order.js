const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderName: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhoneNumber: Number,
    price: Number,
    orderNotes: String
})

module.exports = mongoose.model('Order', orderSchema)