
import redis from '../connections/redis'

const KEY = 'email'

export async function get() {
    const value = await redis.get(KEY)
    return value && JSON.parse(value)
}

export async function set(data) {
    await redis.set(KEY, JSON.stringify(data))
}
