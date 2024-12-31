const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
// require('dotenv').config();np
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('app is listening on 3000')
})