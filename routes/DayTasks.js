const express = require('express')
const router = express.Router()

const DayTask = require('../models/daytask');

// Get day tasks
router.get('/', async (req, res) => {
    try {
        const result = await DayTask.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Update day tasks
router.patch('/:id', async (req, res) => {
    try {
        const dayTaskId = req.params.id
        const result = await DayTask.findByIdAndUpdate({_id: dayTaskId}, req.body, {new: true})
        res.send(result[0])
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Create New Day Task
router.post('/', async (req, res) => {
    const dayTask = new DayTask(req.body)
    try {
        await dayTask.save()
        res.status(201).json(dayTask) // .json = .send
        console.log(req.body)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

module.exports = router