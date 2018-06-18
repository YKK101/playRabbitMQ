const express = require('express')
const amqp = require('amqplib')

const PORT = 7000
const RABBIT_URL = 'amqp://icxuixvf:Y8tnrMAZH6TXrAWipO_cF6FffOovSroT@mustang.rmq.cloudamqp.com/icxuixvf'
const UPDATE_QUEUE = 'source_updated'

let channel
amqp.connect(RABBIT_URL)
  .then(conn => {
    return conn.createChannel()
  }).then(ch => {
    channel = ch
  }).catch(err => {
    console.log(`Error connection:\n${err}`)
  })

const app = express()

app.get('/provide', (req, res) => {
  channel.assertQueue(UPDATE_QUEUE, {
    durable: false,
  })

  channel.sendToQueue(UPDATE_QUEUE, new Buffer('update!'))

  console.log('UPDATE_QUEUE sent')
  res.send({ status: 'success' })
})

app.listen(PORT, () => { console.log(`http://localhost:${7000}`) })