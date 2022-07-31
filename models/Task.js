
import { Queue, Worker } from 'bullmq'

import redis from '../connections/redis'
import worker from '../modules/worker'

const queueName = 'readerQueue'

const readerQueue = new Queue(queueName, {
    connection: redis,
})

const readerWorker = new Worker(queueName, worker, {
    connection: redis,
})

export default readerQueue
