const express = require('express')
const router = express.Router()

const Debt = require('../models/debt');

// Get All Debtss
router.get('/', async (req, res) => {
    try {
        const result = await Debt.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Get Debt by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await Debt.findById(req.params.id)
        !result ? res.status(404).json("Debt not found") : res.json(result)
        
    } catch(error) {
        res.status(500).json("Wrong ID format")
    }
})

// Create New Debt
router.post('/', async (req, res) => {
    const debt = new Debt(req.body)
    try {
        await debt.save()
        res.status(201).json(debt) // .json = .send
        console.log(req.body)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

// Update a existing debt (update one or more fields)
router.patch('/:id', async (req, res) => {
    try {
        const debtId = req.params.id
        const result = await Debt.findByIdAndUpdate({_id: debtId}, req.body, {new: true})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Delete a existing debt
router.delete('/:id', async (req, res) => {
    try {
        const debtId = req.params.id
        const result = await Debt.deleteOne({_id: debtId})
        res.send("deleted count: " + result.deletedCount)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

module.exports = router