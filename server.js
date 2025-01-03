const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
// require('dotenv').config();np
const PORT = process.env.PORT || 3000

//Import the router files
const userRoutes = require('./routes/userRoutes');

//Use the router
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log('app is listening on 3000')
})