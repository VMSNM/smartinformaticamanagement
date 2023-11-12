const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION


// API ENDPOINTS

// HOMEPAGE ENDPOINTS
app.get('/', (req, res) => {
    res.send('Welcome')
})
// END HOMEPAGE ENDPOINTS

// LOGIN USERS ENDPOINTS
// Get Users
const User = require('./models/user');

app.get('/api/users', async (req, res) => {
    try {
        const result = await User.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Check Data from Login From and Validate User
app.post('/api/users', async (req, res) => {
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
// END LOGIN USERS ENDPOINTS

// DAYTAKS ENDPOINTS
// Get day tasks
const DayTask = require('./models/daytask');

app.get('/api/daytasks', async (req, res) => {
    try {
        const result = await DayTask.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Update day tasks
app.patch('/api/daytasks/:id', async (req, res) => {
    try {
        const dayTaskId = req.params.id
        const result = await DayTask.findByIdAndUpdate({_id: dayTaskId}, req.body, {new: true})
        res.send(result[0])
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Create New Day Task
app.post('/api/daytasks', async (req, res) => {
    const dayTask = new DayTask(req.body)
    try {
        await dayTask.save()
        res.status(201).json(dayTask) // .json = .send
        console.log(req.body)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

// DAYTASKS ENDPOINTS


// CUSTOMERS ENDPOINTS
const Customer = require('./models/customer');

// Get All Customers
app.get('/api/customers', async (req, res) => {
    /* console.log(await mongoose.connection.db.listCollections().toArray()) - to list all collections */
    try {
        const result = await Customer.find() // no params to retrieve all (ex: {name: "Guilherme"})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Get Customer by ID
app.get('/api/customers/:id', async (req, res) => {
    try {
        /* const {id: customerId} = req.params */
        const result = await Customer.findById(req.params.id)
        !result ? res.status(404).json("User not found") : res.json(result)
        
    } catch(error) {
        res.status(500).json("Wrong ID format")
    }
})

// Create New Customer
app.post('/api/customers', async (req, res) => {
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
app.patch('/api/customers/:id', async (req, res) => {
    try {
        const customerId = req.params.id
        const result = await Customer.findByIdAndUpdate({_id: customerId}, req.body, {new: true})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Delete a existing customer
app.delete('/api/customers/:id', async (req, res) => {
    try {
        const customerId = req.params.id
        const result = await Customer.deleteOne({_id: customerId})
        res.send("deleted count: " + result.deletedCount)
    } catch(error) {
        res.status(500).send(error.message)
    }
})
//END CUSTOMER ENDPOINTS

// ORDERS ENDPOINTS
const Order = require('./models/order');

// Get All Orders
app.get('/api/orders', async (req, res) => {
    try {
        const result = await Order.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Get Order by ID
app.get('/api/orders/:id', async (req, res) => {
    try {
        const result = await Order.findById(req.params.id)
        !result ? res.status(404).json("Order not found") : res.json(result)
        
    } catch(error) {
        res.status(500).json("Wrong ID format")
    }
})

// Create New Order
app.post('/api/orders', async (req, res) => {
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
app.patch('/api/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id
        const result = await Order.findByIdAndUpdate({_id: orderId}, req.body, {new: true})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Delete a existing order
app.delete('/api/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id
        const result = await Order.deleteOne({_id: orderId})
        res.send("deleted count: " + result.deletedCount)
    } catch(error) {
        res.status(500).send(error.message)
    }
})
//END ORDERS ENDPOINTS


// SERVICESPENDING ENDPOINTS
const ServicePending = require('./models/servicesPending');

// Get All Services Pending
app.get('/api/servicespending', async (req, res) => {
    try {
        const result = await ServicePending.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Get Service Pending by ID
app.get('/api/servicespending/:id', async (req, res) => {
    try {
        const result = await ServicePending.findById(req.params.id)
        !result ? res.status(404).json("Pending service not found") : res.json(result)
        
    } catch(error) {
        res.status(500).json("Wrong ID format")
    }
})

// Create New Service Pending
app.post('/api/servicespending', async (req, res) => {
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
app.patch('/api/servicespending/:id', async (req, res) => {
    try {
        const servicePendingId = req.params.id
        const result = await ServicePending.findByIdAndUpdate({_id: servicePendingId}, req.body, {new: true})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Delete a existing service pending
app.delete('/api/servicespending/:id', async (req, res) => {
    try {
        const servicePendingId = req.params.id
        const result = await ServicePending.deleteOne({_id: servicePendingId})
        res.send("deleted count: " + result.deletedCount)
    } catch(error) {
        res.status(500).send(error.message)
    }
})
//END SERVICESPENDING ENDPOINTS


// SERVICESFINISHED ENDPOINTS
const ServiceFinished = require('./models/servicesFinished');

// Get All Services Finished
app.get('/api/servicesfinished', async (req, res) => {
    try {
        const result = await ServiceFinished.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Get Service Finished by ID
app.get('/api/servicesfinished/:id', async (req, res) => {
    try {
        const result = await ServiceFinished.findById(req.params.id)
        !result ? res.status(404).json("Finished service not found") : res.json(result)
        
    } catch(error) {
        res.status(500).json("Wrong ID format")
    }
})

// Create New Service Finished
app.post('/api/servicesfinished', async (req, res) => {
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
app.patch('/api/servicesfinished/:id', async (req, res) => {
    try {
        const serviceFinishedId = req.params.id
        const result = await ServiceFinished.findByIdAndUpdate({_id: serviceFinishedId}, req.body, {new: true})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Delete a existing service finished
app.delete('/api/servicesfinished/:id', async (req, res) => {
    try {
        const serviceFinishedId = req.params.id
        const result = await ServiceFinished.deleteOne({_id: serviceFinishedId})
        res.send("deleted count: " + result.deletedCount)
    } catch(error) {
        res.status(500).send(error.message)
    }
})
//END SERVICESFINISHED ENDPOINTS


// PRODUCTS ENDPOINTS
const Product = require('./models/product');

// Get All Products
app.get('/api/products', async (req, res) => {
    try {
        const result = await Product.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Get Product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const result = await Product.findById(req.params.id)
        !result ? res.status(404).json("Product not found") : res.json(result)
        
    } catch(error) {
        res.status(500).json("Wrong ID format")
    }
})

// Create New Product
app.post('/api/products', async (req, res) => {
    const product = new Product(req.body)
    try {
        await product.save()
        res.status(201).json(product) // .json = .send
        console.log(req.body)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

// Update a existing product (update one or more fields)
app.patch('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const result = await Product.findByIdAndUpdate({_id: productId}, req.body, {new: true})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Delete a existing product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const result = await Product.deleteOne({_id: productId})
        res.send("deleted count: " + result.deletedCount)
    } catch(error) {
        res.status(500).send(error.message)
    }
})
//END PRODUCTS ENDPOINTS


// DEBTS ENDPOINTS
const Debt = require('./models/debt');

// Get All Debtss
app.get('/api/debts', async (req, res) => {
    try {
        const result = await Debt.find()
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Get Debt by ID
app.get('/api/debts/:id', async (req, res) => {
    try {
        const result = await Debt.findById(req.params.id)
        !result ? res.status(404).json("Debt not found") : res.json(result)
        
    } catch(error) {
        res.status(500).json("Wrong ID format")
    }
})

// Create New Debt
app.post('/api/debts', async (req, res) => {
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
app.patch('/api/debts/:id', async (req, res) => {
    try {
        const debtId = req.params.id
        const result = await Debt.findByIdAndUpdate({_id: debtId}, req.body, {new: true})
        res.send(result)
    } catch(error) {
        res.status(500).send(error.message)
    }
})

// Delete a existing debt
app.delete('/api/debts/:id', async (req, res) => {
    try {
        const debtId = req.params.id
        const result = await Debt.deleteOne({_id: debtId})
        res.send("deleted count: " + result.deletedCount)
    } catch(error) {
        res.status(500).send(error.message)
    }
})
//END DEBTS ENDPOINTS

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