
import { useState, useEffect } from 'react'
import { Descriptions, Tabs, message } from 'antd'
import { Form, Input, InputNumber, Switch, Button } from 'antd'

export default function Email() {
    const [ email, setEmail ] = useState({
        host: 'smtp.qq.com',
        port: 465,
        secure: true,
        auth: {
            user: null,
            pass: null,
        },
    })

    useEffect(() => {
        fetch('/api/email')
        .then(res => res.json())
        .then(res => {
            if (res.data) {
                setEmail(res.data)
            }
        })
        .catch(e => {
            console.log('fetch email error', e)
        })
    }, [])

    const onFinish = async (values) => {
        await fetch('/api/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
        setEmail(values)
        message.success('Email 配置成功')
    }

return (
<Tabs defaultActiveKey='1'>
    <Tabs.TabPane tab='Email' key='1'>
    <Descriptions title='Email'>
        <Descriptions.Item label="Host">{email.host}</Descriptions.Item>
        <Descriptions.Item label="Port">{email.port}</Descriptions.Item>
        <Descriptions.Item label="Secure">{String(email.secure)}</Descriptions.Item>
        <Descriptions.Item label="User">{email.auth && email.auth.user}</Descriptions.Item>
        <Descriptions.Item label="Pass">{email.auth && email.auth.pass && email.auth.pass.replace(/\w/g, '*')}</Descriptions.Item>
    </Descriptions>
    </Tabs.TabPane>
    <Tabs.TabPane tab='Set Email' key='2'>
    <Form
        labelCol={{ span: 8 }}
        initialValues={email}
        onFinish={onFinish}
    >
        <Form.Item
            label='Host'
            name='host'
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label='Port'
            name='port'
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <InputNumber />
        </Form.Item>
        <Form.Item
            label='Secure'
            name='secure'
            rules={[
                {
                    required: true,
                },
            ]}
            valuePropName='checked'
        >
            <Switch />
        </Form.Item>
        <Form.Item
            label='User'
            name={['auth', 'user']}
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label='Pass'
            name={['auth', 'pass']}
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Input.Password />
        </Form.Item>
        <Form.Item
            wrapperCol={{ span: 8, offset: 8 }}
        >
            <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>

    </Form>
    </Tabs.TabPane>
</Tabs>
)
}
