
import { useState, useEffect } from 'react'

import { Row, Col, Statistic } from 'antd'

export default function Home() {
    const [ counts, setCounts ] = useState({})

    useEffect(() => {
        fetch('/api/task?name=getJobCounts')
        .then(res => res.json())
        .then(res => {
            if (res.data) {
                setCounts(res.data)
            }
        })
        .catch(e => {
            console.log('fetch task error', e)
        })
    }, [])

  return (
      <Row gutter={16}>
        <Col span={8}>
            <Statistic title='Completed' value={counts.completed || 0} />
        </Col>
        <Col span={8}>
            <Statistic title='Failed' value={counts.failed || 0} />
        </Col>
        <Col span={8}>
            <Statistic title='Active' value={counts.active || 0} />
        </Col>
      </Row>
  )
}
