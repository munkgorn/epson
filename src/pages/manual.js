import React from 'react';
import{  Col, Divider, Row  } from 'antd';
import { Card, Space } from 'antd';
import { AlertOutlined,SolutionOutlined,HomeOutlined ,UserOutlined   } from '@ant-design/icons';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Breadcrumb } from 'antd';
const { Meta } = Card;
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
                        href: '/datacenter',
                        title: (
                        <>
                            <UserOutlined />
                            <span>Data Center</span>
                        </>
                        ),
                    },
                    {
                        title: 'Manual',
                    },
                    ]}
                />
                </Col>
            </Row>
            <Card>
            <Row justify="center">
                <Col span={5}  style={{ margin: '10px' }}>
                    <a href="/manualDetail">
                        <Card
                             hoverable
                             style={{
                                textAlign: 'center',
                                height:320,
                             }}
                            cover={<img alt="example" src="images/m1.png" />}
                        >
                            <div style={{ marginTop: 'auto' }}>
                                <Meta title="Inkjet" description="" />
                            </div>
                        </Card>
                    </a>
                </Col>
                <Col span={5}  style={{ margin: '10px' }}>
                    <a href="/manualDetail">
                        <Card
                             hoverable
                             style={{
                             textAlign: 'center',
                             height:320,
                             }}
                            cover={<img alt="example" src="images/m2.png" />}
                        >
                            <div style={{ marginTop: 'auto' }}>
                                <Meta title="BIJ" description="" />
                            </div>
                        </Card>
                    </a>
                </Col>
                <Col span={5}  style={{ margin: '10px' }}>
                    <a href="/manualDetail">
                        <Card
                             hoverable
                             style={{
                             textAlign: 'center',
                             height:320,
                             }}
                            cover={<img alt="example" src="images/m3.png" />}
                        >
                            <div style={{ marginTop: 'auto' }}>
                                <Meta title="Dot Matrix" description="" />
                            </div>
                        </Card>
                    </a>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={5}  style={{ margin: '10px' }}>
                    <a href="/manualDetail">
                        <Card
                             hoverable
                             style={{
                                textAlign: 'center',
                                height:320,
                             }}
                            cover={<img alt="example" src="images/m4.png" />}
                        >
                            <div style={{ marginTop: 'auto' }}>
                                <Meta title="Small Printer" description="" />
                            </div>
                        </Card>
                    </a>
                </Col>
                <Col span={5}  style={{ margin: '10px' }}>
                    <a href="/manualDetail">
                        <Card
                             hoverable
                             style={{
                             textAlign: 'center',
                             height:320,
                             }}
                            cover={<img alt="example" src="images/m5.png" />}
                        >
                            <div style={{ marginTop: 'auto' }}>
                                <Meta title="Projector" description="" />
                            </div>
                        </Card>
                    </a>
                </Col>
                <Col span={5}  style={{ margin: '10px' }}>
                    <a href="/manualDetail">
                        <Card
                             hoverable
                             style={{
                             textAlign: 'center',
                             height:320,
                             }}
                            cover={<img alt="example" src="images/m6.png" />}
                        >
                            <div style={{ marginTop: 'auto' }}>
                                <Meta title="LFP" description="" />
                            </div>
                        </Card>
                    </a>
                </Col>
            </Row>
            </Card>
        </Space>
    </>
  )
}
