const express = require('express')
const router = express.Router()

const Customer = require('../models/customer');

// Get All Customers
router.get('/', async (req, res) => {
    /* console.log(await mongoose.connection.db.listCollections().toArray()) - to list all collections */
    try {
        const result = await Customer.find() // no params to retrieve all (ex: {name: "Guilherme"})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Get Customer by ID
router.get('/:id', async (req, res) => {
    try {
        /* const {id: customerId} = req.params */
        const result = await Customer.findById(req.params.id)
        !result ? res.status(404).json("User not found") : res.json(result)
        
    } catch(error) {
        res.status(500).json("Wrong ID format")
    }
})

// Create New Customer
router.post('/', async (req, res) => {
    const customer = new Customer(req.body)
    try {
        await customer.save()
        res.status(201).json(customer) // .json = .send
        console.log(req.body)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

// Update a existing customer (update one or more fields)
router.patch('/:id', async (req, res) => {
    try {
        const customerId = req.params.id
        const result = await Customer.findByIdAndUpdate({_id: customerId}, req.body, {new: true})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Delete a existing customer
router.delete('/:id', async (req, res) => {
    try {
        const customerId = req.params.id
        const result = await Customer.deleteOne({_id: customerId})
        res.send("deleted count: " + result.deletedCount)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

module.exports = router