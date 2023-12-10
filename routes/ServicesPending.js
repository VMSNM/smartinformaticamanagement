const express = require('express')
const router = express.Router()

const ServicePending = require('../models/servicesPending');

// Get All Services Pending
router.get('/', async (req, res) => {
    try {
        const result = await ServicePending.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Get Service Pending by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await ServicePending.findById(req.params.id)
        !result ? res.status(404).json("Pending service not found") : res.json(result)
        
    } catch(error) {
        res.status(500).json("Wrong ID format")
    }
})

// Create New Service Pending
router.post('/', async (req, res) => {
    const servicePending = new ServicePending(req.body)
    try {
        await servicePending.save()
        res.status(201).json(servicePending) // .json = .send
        console.log(req.body)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

// Update a existing service pending (update one or more fields)
router.patch('/:id', async (req, res) => {
    try {
        const servicePendingId = req.params.id
        const result = await ServicePending.findByIdAndUpdate({_id: servicePendingId}, req.body, {new: true})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Delete a existing service pending
router.delete('/:id', async (req, res) => {
    try {
        const servicePendingId = req.params.id
        const result = await ServicePending.deleteOne({_id: servicePendingId})
        res.send("deleted count: " + result.deletedCount)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

module.exports = router