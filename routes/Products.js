const express = require('express')
const router = express.Router()

const Product = require('../models/product');

// Get All Products
router.get('/', async (req, res) => {
    try {
        const result = await Product.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Get Product by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await Product.findById(req.params.id)
        !result ? res.status(404).json("Product not found") : res.json(result)
        
    } catch(error) {
        res.status(500).json("Wrong ID format")
    }
})

// Create New Product
router.post('/', async (req, res) => {
    const product = new Product(req.body)
    try {
        await product.save()
        res.status(201).json(product) // .json = .send
        console.log(req.body)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

// Update a existing product (update one or more fields)
router.patch('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const result = await Product.findByIdAndUpdate({_id: productId}, req.body, {new: true})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Delete a existing product
router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const result = await Product.deleteOne({_id: productId})
        res.send("deleted count: " + result.deletedCount)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

module.exports = router