const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 5000;
const CONNECTION = process.env.CONNECTION

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const loginRoute = require('./routes/Login')
const usersRoute = require('./routes/Users')
const watchlistsRoute = require('./routes/Watchlists')

app.use('/api/login', loginRoute)
app.use('/api/users', usersRoute)
app.use('/api/watchlists', watchlistsRoute)

const start = async () => {
    try {
        await mongoose.connect(CONNECTION)
        app.listen(PORT, () => {
            console.log("App listening on port " + PORT)
        })
    } catch(error) {
        console.log(error.message)
    }
}

start()