
import { get, set } from '../../models/Email'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await set(req.body)
    }
    const value = await get()
    res.json({ data: value })
}
