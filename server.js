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

const loginRoute = require('./routes/Users')
const daytasksRoute = require('./routes/DayTasks')
const customersRoute = require('./routes/Customers')
const ordersRoute = require('./routes/Orders')
const servicesPendingRoute = require('./routes/ServicesPending')
const servicesFinishedRoute = require('./routes/ServicesFinished')
const productsRoute = require('./routes/Products')
const debtsRoute = require('./routes/Debts')

app.use('/api/users', loginRoute)
app.use('/api/daytasks', daytasksRoute)
app.use('/api/customers', customersRoute)
app.use('/api/orders', ordersRoute)
app.use('/api/servicespending', servicesPendingRoute)
app.use('/api/servicesfinished', servicesFinishedRoute)
app.use('/api/products', productsRoute)
app.use('/api/debts', debtsRoute)

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