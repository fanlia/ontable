
import Task from '../../models/Task'

export default async function handler(req, res) {
    const { name, args = [] } = {...req.query, ...req.body}
    let result = null

    if (name === 'DEMO') {
        result = await Task.add('test', {
            url: 'https://www.hengyang.gov.cn/edu/zsks/zsgz/index.html',
            keywords: ['2022', '初中', '招生'],
            actions: [
                {
                    type: 'email',
                    data: {
                        to: '397931692@qq.com',
                    },
                },
            ],
        })
    } else {
        result = await Task[name](...args)
    }
    res.send({ data: result })
}
