import React from 'react';
import{  Col, Divider, Row  } from 'antd';
import { Card, Space } from 'antd';
import { AlertOutlined,SolutionOutlined  } from '@ant-design/icons';
import { HomeOutlined ,UserOutlined   } from '@ant-design/icons';
const { Meta } = Card;
import { Breadcrumb } from 'antd';
export default function index() {
  return (
    <>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row justify="center">
                <Col span={20}>
                <Breadcrumb
                    items={[
                    {
                        href: '/home',
                        title: <HomeOutlined />,
                    },
                    {
                        title: 'Data Center',
                    },
                    ]}
                />
                </Col>
            </Row>
            <Row justify="center">
                <Col span={6}  style={{ margin: '20px', marginTop: '10px' }}>
                    <a href="/specification">
                        <Card
                             hoverable
                             style={{
                             // width: 240,
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center',
                             textAlign: 'center',
                             padding: '16px',
                             }}
                            // cover={<img alt="example" src="images/epson.png" />}
                        >
                            <SolutionOutlined  style={{ fontSize: '24px', color: '#08c',marginBottom: '16px' }}/>
                            <Meta title="Specification" description="" />
                        </Card>
                    </a>
                </Col>
                <Col span={6}  style={{ margin: '20px', marginTop: '10px' }}>
                    <a href="/manual">
                        <Card
                            hoverable
                            style={{
                            // width: 240,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            padding: '16px',
                            }}
                            // cover={<img alt="example" src="images/epson.png" />}
                        >
                            <AlertOutlined style={{ fontSize: '24px', color: '#08c',marginBottom: '16px' }}/>
                            <Meta title="Manual" description="" />
                        </Card>
                    </a>
                </Col>
                <Col span={6}  style={{ margin: '20px', marginTop: '10px' }}>
                    <a href="/knowledgeBase">
                        <Card
                            hoverable
                            style={{
                            // width: 240,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            padding: '16px',
                            }}
                            // cover={<img alt="example" src="images/epson.png" />}
                        >
                            <AlertOutlined style={{ fontSize: '24px', color: '#08c',marginBottom: '16px' }}/>
                            <Meta title="Knowledge Base" description="" />
                        </Card>
                    </a>
                </Col>
            </Row>
        </Space>
    </>
  )
}
