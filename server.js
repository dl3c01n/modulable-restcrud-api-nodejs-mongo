const express = require('express');
const mongoose = require('mongoose');
const { URI } = require('./config/config')

const usersRoutes = require('./routes/api/users')

const app = express();

app.use(express.json())

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err))

app.use('/api/users', usersRoutes)

const PORT = 5000

app.listen(PORT, () => {
    console.log("App is running on port : " + PORT)
})