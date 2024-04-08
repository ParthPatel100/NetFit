const mongoose = require('mongoose');
var cors = require('cors')
const express = require('express')
const User = require('./MongoDB/schema/user.js');
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')



app.use(bodyParser.json())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

const port = 8080

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/', require('./routes/authRoutes'))
app.use('/goal', require('./routes/goalRoutes'))
