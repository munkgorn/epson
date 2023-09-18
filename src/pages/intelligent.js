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
                        title: 'Intelligent Troubleshooting',
                    },
                    ]}
                />
                </Col>
            </Row>
            <Card>
                <Row justify="center">
                    <Col span={20}  style={{ margin: '10px' }}>
                        <h3>LFP</h3>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={5}  style={{ margin: '10px' }}>
                        <a href="/intrlligentDetail">
                            <Card
                                hoverable
                                style={{
                                    textAlign: 'center',
                                }}
                                cover={<img alt="example" src="images/lfp1.png" />}
                            >
                                <div style={{ marginTop: 'auto' }}>
                                    <Meta title="SC-F Series" description="" />
                                </div>
                            </Card>
                        </a>
                    </Col>
                    <Col span={5}  style={{ margin: '10px' }}>
                        <a href="/intrlligentDetail">
                            <Card
                                hoverable
                                style={{
                                textAlign: 'center',
                                }}
                                cover={<img alt="example" src="images/lfp2.png" />}
                            >
                                <div style={{ marginTop: 'auto' }}>
                                    <Meta title="SC-P Series" description="" />
                                </div>
                            </Card>
                        </a>
                    </Col>
                    <Col span={5}  style={{ margin: '10px' }}>
                        <a href="/intrlligentDetail">
                            <Card
                                hoverable
                                style={{
                                textAlign: 'center',
                                }}
                                cover={<img alt="example" src="images/lfp3.png" />}
                            >
                                <div style={{ marginTop: 'auto' }}>
                                    <Meta title="SC-S Series" description="" />
                                </div>
                            </Card>
                        </a>
                    </Col>
                    <Col span={5}  style={{ margin: '10px' }}>
                        <a href="/intrlligentDetail">
                            <Card
                                hoverable
                                style={{
                                textAlign: 'center',
                                }}
                                cover={<img alt="example" src="images/lfp4.png" />}
                            >
                                <div style={{ marginTop: 'auto' }}>
                                    <Meta title="SC-S Series" description="" />
                                </div>
                            </Card>
                        </a>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={20}  style={{ margin: '10px' }}>
                        <h3>Projector / Others</h3>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={5}  style={{ margin: '10px' }}>
                        <a href="/projector">
                            <Card
                                hoverable
                                style={{
                                    textAlign: 'center',
                                }}
                                cover={<img alt="example" src="images/p1.png" />}
                            >
                                <div style={{ marginTop: 'auto' }}>
                                    <Meta title="Projector" description="" />
                                </div>
                            </Card>
                        </a>
                    </Col>
                    <Col span={5}  style={{ margin: '10px' }}>
                        <a href="/otherCheckErrorCodeLIJ">
                            <Card
                                hoverable
                                style={{
                                textAlign: 'center',
                                }}
                                cover={<img alt="example" src="images/p2.png" />}
                            >
                                <div style={{ marginTop: 'auto' }}>
                                    <Meta title="LIJ" description="" />
                                </div>
                            </Card>
                        </a>
                    </Col>
                    <Col span={5}  style={{ margin: '10px' }}>
                        <a href="/otherCheckErrorCode">
                            <Card
                                hoverable
                                style={{
                                textAlign: 'center',
                                }}
                                cover={<img alt="example" src="images/p3.png" />}
                            >
                                <div style={{ marginTop: 'auto' }}>
                                    <Meta title="RIPs" description="" />
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
