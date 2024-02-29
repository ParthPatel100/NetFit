const express = require('express')
const app = express()
const port = 8000

app.get('/yep', (req, res) => {
  res.send('Testing if working')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})