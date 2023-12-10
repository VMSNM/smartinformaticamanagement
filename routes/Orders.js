const express = require('express')
const router = express.Router()

const Order = require('../models/order');

// Get All Orders
router.get('/', async (req, res) => {
    try {
        const result = await Order.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Get Order by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await Order.findById(req.params.id)
        !result ? res.status(404).json("Order not found") : res.json(result)
        
    } catch(error) {
        res.status(500).json("Wrong ID format")
    }
})

// Create New Order
router.post('/', async (req, res) => {
    const order = new Order(req.body)
    try {
        await order.save()
        res.status(201).json(order) // .json = .send
        console.log(req.body)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

// Update a existing order (update one or more fields)
router.patch('/:id', async (req, res) => {
    try {
        const orderId = req.params.id
        const result = await Order.findByIdAndUpdate({_id: orderId}, req.body, {new: true})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Delete a existing order
router.delete('/:id', async (req, res) => {
    try {
        const orderId = req.params.id
        const result = await Order.deleteOne({_id: orderId})
        res.send("deleted count: " + result.deletedCount)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

module.exports = router