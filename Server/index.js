const mongoose = require('mongoose');
var cors = require('cors')
const express = require('express')
const User = require('./MongoDB/schema/user.js');
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken");


const authenticateToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.sendStatus(403); // Forbidden
    } else if (user) {
      // If token is valid, set the user object in the request for later use
      req.user = user;
      next(); // Proceed to the next middleware
    } else {
      console.log("Token not valid");
      return res.sendStatus(403); // Forbidden
    }
  });
}

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

app.use('/track', authenticateToken, require('./routes/trackingRoutes'))

app.use('/goal', authenticateToken, require('./routes/goalRoutes'))
app.use('/progress', authenticateToken, require('./routes/progressDataRoutes'))
app.use('/navbar', authenticateToken, require('./routes/navbarRoutes'))
app.use('/user', authenticateToken, require('./routes/user'))
app.use('/navbar', authenticateToken, require('./routes/navbarRoutes'))
app.use('/post', authenticateToken, require('./routes/postRoutes'))
app.use('/landing', authenticateToken, require('./routes/landingRoutes'))

