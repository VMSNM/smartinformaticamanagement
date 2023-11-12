const mongoose = require('mongoose')

const dayTaskSchema = new mongoose.Schema({
    dayTasks: {
        type: String
    }
})

module.exports = mongoose.model('DayTask', dayTaskSchema)