
import Navbar from './navbar'
import Footer from './footer'

import Head from 'next/head'
import { Layout, Row, Col } from 'antd'

export default function MyLayout({ children }) {
    return (
        <Layout>
            <Layout.Header>
                <Head>
                    <title>ROBORE</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Row gutter={16}>
                <Col>
                    <strong style={{color: 'white'}}>ROBORE</strong>
                </Col>
                <Col flex='auto'>
                    <Navbar />
                </Col>
                </Row>
            </Layout.Header>
            <Layout.Content style={{
                padding: '50px',
                backgroundColor: 'white',
                minHeight: '85vh',
            }}>
                <main>{children}</main>
            </Layout.Content>
            <Layout.Footer style={{
                textAlign: 'center',
            }}>
                <Footer />
            </Layout.Footer>
        </Layout>
    )
}
