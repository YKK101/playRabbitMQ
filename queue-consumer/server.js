const amqp = require('amqplib')

const RABBIT_URL = 'amqp://icxuixvf:Y8tnrMAZH6TXrAWipO_cF6FffOovSroT@mustang.rmq.cloudamqp.com/icxuixvf'
const UPDATE_QUEUE = 'source_updated'
const BROADCAST = 'ex'

amqp.connect(RABBIT_URL, { durable: false })
  .then(conn => {
    return conn.createChannel()
  }).then(ch => {
    ch.assertExchange(BROADCAST, 'fanout', { durable: false })
    const queue = ch.assertQueue('', { exclusive: true })
    queue.then(q => {
      console.log('Waiting for broadcast')

      ch.bindQueue(q.queue, BROADCAST, '')

      ch.consume(q.queue, msg => {
        const recieved = msg.content.toString()
        console.log(`Recieved ${recieved}`)
        console.log(JSON.stringify(msg, null, 4))
      }, {
        noAck: true,
      })
    }).catch(err => console.log('Error subscribe'))

    // BASIC QUEUE
    // console.log('Waiting for UPDATE_QUEUE')
  
    // ch.consume(UPDATE_QUEUE, msg => {
    //   const recieved = msg.content.toString()
    //   console.log(`Recieve ${recieved}`)
    //   console.log(JSON.stringify(msg, null, 4))
    // }, {
    //   noAck: true,
    // })
  }).catch(err => {
    console.log(`Error connection:\n${err}`)
  })