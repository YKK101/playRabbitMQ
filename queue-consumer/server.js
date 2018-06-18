const amqp = require('amqplib')

const RABBIT_URL = 'amqp://icxuixvf:Y8tnrMAZH6TXrAWipO_cF6FffOovSroT@mustang.rmq.cloudamqp.com/icxuixvf'
const UPDATE_QUEUE = 'source_updated'

amqp.connect(RABBIT_URL, { durable: false })
  .then(conn => {
    return conn.createChannel()
  }).then(ch => {
    console.log('Waiting for UPDATE_QUEUE')
  
    ch.consume(UPDATE_QUEUE, msg => {
      const recieved = msg.content.toString()
      console.log(`Recieve ${recieved}`)
      console.log(JSON.stringify(msg, null, 4))
    }, {
      noAck: true,
    })
  }).catch(err => {
    console.log(`Error connection:\n${err}`)
  })