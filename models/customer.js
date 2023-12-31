const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: Number,
    email: String,
    notes: String,
    photo: String
})

module.exports = mongoose.model('Customer', customerSchema)