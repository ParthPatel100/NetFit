const mongoose = require('mongoose');
var cors = require('cors')
const express = require('express')
const User = require('./MongoDB/schema/user.js');
const app = express()
app.use(cors());
const port = 8000

app.get('/verifyLogin', async(req, res)  => {
  var username = req.query.username;
  await mongoose.connect("mongodb://admin:password@localhost:27017/app_db?authSource=admin");
  User.find({username: username})
  .then((result) => {
    res.send(JSON.stringify(result));
  })
  .finally(() =>{
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})