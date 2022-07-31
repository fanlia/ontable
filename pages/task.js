
import { useState, useEffect } from 'react'
import { Select, Table, Descriptions, Tabs, message, Tag, Collapse } from 'antd'
import { Form, Input, InputNumber, Switch, Button } from 'antd'

export default function Email() {
    const [ tasks, setTasks ] = useState([])

    const fetchTasks = () => {
        return fetch('/api/task?name=getJobs')
        .then(res => res.json())
        .then(res => {
            if (res.data) {
                setTasks(res.data)
            }
        })
        .catch(e => {
            console.log('fetch task error', e)
        })
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const handleClear = async () => {
        const types = ["completed", "failed", "active", "delayed", "paused", "wait"]
        await Promise.all(types.map(type => {
            return fetch('/api/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'clean',
                    args: [
                        5000,
                        1000,
                        type,
                    ],
                }),
            })
        }))
        await fetchTasks()
        message.success('Task 删除成功')
    }

    const onFinish = async (data) => {
        await fetch('/api/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'add',
                args: [
                    'web',
                    {
                        url: data.url,
                        keywords: data.keywords,
                        actions: [
                            {
                                type: 'email',
                                data: data.email,
                            },
                        ],
                    },
                ],
            }),
        })
        await fetchTasks()
        message.success('Task 创建成功')
    }

    const columns = [
        {
            title: 'Status',
            dataIndex: ['stacktrace'],
            key: 'status',
            render: (stacktrace) => {
                const data = stacktrace.length > 0 ? { color: 'red', text: 'error' } : { color: 'green', text: 'success' }
                return <Tag color={data.color}>{data.text}</Tag>
            },
        },
        {
            title: 'Timestamp',
            dataIndex: ['timestamp'],
            key: 'timestamp',
            render: (timestamp) => {
                return new Date(timestamp).toLocaleString()
            },
        },
        {
            title: 'Url',
            dataIndex: ['data', 'url'],
            key: 'url',
        },
        {
            title: 'Keywords',
            dataIndex: ['data', 'keywords'],
            key: 'keywords',
            render: (keywords) => (
                <>
                {keywords.map((keyword, i) => (
                    <Tag key={i} color='green'>{keyword}</Tag>
                ))}
                </>
            )
        },
        {
            title: 'Actions',
            dataIndex: ['data', 'actions'],
            key: 'actions',
            render: (actions) => (
                <>
                {actions.map((action, i) => {
                    if (action.type === 'email') {
                        return <p key={i}>
                            <span>{action.type}</span><br/>
                            <span>to: {action.data.to}</span>
                        </p>
                    } else {
                        return <p>unknown</p>
                    }
                })}
                </>
            )
        },
    ]

return (
    <>
<Button onClick={handleClear}>Clear</Button>
<Tabs defaultActiveKey='1'>
    <Tabs.TabPane tab='Task' key='1'>
    <Table dataSource={tasks} columns={columns} rowKey={['id']} />
    </Tabs.TabPane>
    <Tabs.TabPane tab='New Task' key='2'>
    <Form
        labelCol={{ span: 8 }}
        initialValues={{
            url:'https://www.hengyang.gov.cn/edu/zsks/zsgz/index.html',
            keywords: ['2022', '初中', '招生'],
        }}
        onFinish={onFinish}
    >
        <Form.Item
            label='Url'
            name='url'
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label='Keywords'
            name='keywords'
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Select mode='tags'></Select>
        </Form.Item>
        <Form.Item
            label='Email'
            name={['email', 'to']}
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            wrapperCol={{ span: 8, offset: 8 }}
        >
            <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>

    </Form>
    </Tabs.TabPane>
</Tabs>
    </>
)
}
