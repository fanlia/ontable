
import Redis from 'ioredis'

export default new Redis({
    maxRetriesPerRequest: null,
})
