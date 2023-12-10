const express = require('express')
const router = express.Router()

const ServiceFinished = require('../models/servicesFinished');

// Get All Services Finished
router.get('/', async (req, res) => {
    try {
        const result = await ServiceFinished.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Get Service Finished by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await ServiceFinished.findById(req.params.id)
        !result ? res.status(404).json("Finished service not found") : res.json(result)
        
    } catch(error) {
        res.status(500).json("Wrong ID format")
    }
})

// Create New Service Finished
router.post('/', async (req, res) => {
    const serviceFinished = new ServiceFinished(req.body)
    try {
        await serviceFinished.save()
        res.status(201).json(serviceFinished) // .json = .send
        console.log(req.body)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

// Update a existing service finished (update one or more fields)
router.patch('/:id', async (req, res) => {
    try {
        const serviceFinishedId = req.params.id
        const result = await ServiceFinished.findByIdAndUpdate({_id: serviceFinishedId}, req.body, {new: true})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Delete a existing service finished
router.delete('/:id', async (req, res) => {
    try {
        const serviceFinishedId = req.params.id
        const result = await ServiceFinished.deleteOne({_id: serviceFinishedId})
        res.send("deleted count: " + result.deletedCount)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

module.exports = router