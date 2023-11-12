const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    specifications: String,
    costPrice: Number,
    sellPrice: Number,
    sellerName: String,
    phoneNumber: Number,
    notes: String,
    photo: String
})

module.exports = mongoose.model('Product', productSchema)