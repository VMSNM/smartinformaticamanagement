const express = require('express')
const router = express.Router()

const User = require('../models/user');

// Get Users
router.get('/', async (req, res) => {
    try {
        const result = await User.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Check Data from Login From and Validate User
router.post('/', async (req, res) => {
    const {username, password} = req.body.formData
    try {
        const result = await User.findOne({username: req.body.formData.username})
        .then(result => {
            result === null ? res.json("Account doesnt exist") : result.password === req.body.formData.password ? res.json(result._id) : res.json("Invalid password")
        })
        .catch(error => res.json(error))
    } catch(error) {
        res.status(500).send(error.message)
    }
})

module.exports = router