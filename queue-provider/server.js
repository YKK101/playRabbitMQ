const express = require('express')

const PORT = 7000

const app = express()

app.get('/', (req, res) => {
  res.send({ status: 'success' })
})

app.listen(PORT, () => { console.log(`http://localhost:${7000}`) })