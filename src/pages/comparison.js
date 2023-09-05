import React from 'react';
import{  Col, Divider, Row  } from 'antd';
import { Card, Space } from 'antd';
import { AlertOutlined,SolutionOutlined,HomeOutlined ,UserOutlined   } from '@ant-design/icons';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Breadcrumb,Menu } from 'antd';
import { Layout,theme  } from 'antd';
import { LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { Content,Sider  } = Layout;
const { Meta } = Card;
function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="#" href="#">
          Model
        </a>
      ),
    },
  ];
  const items2 = [
    getItem(
        <a href="/specification">Specification</a>,
        'specification',
        <UserOutlined />,
      ),
      getItem(
        <a href="/comparison">Comparison</a>,
        'comparison',
        <LaptopOutlined />,
      ),
  ];
export default function index() {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
  return (
    <>
        <Layout>
            <Content style={{ padding: '0 50px' }}>
                <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
                    <Sider
                        style={{
                        background: colorBgContainer,
                        }}
                        width={200}
                    >
                        <Menu
                        mode="inline"
                        defaultSelectedKeys={['comparison']}
                        // defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                        }}
                        items={items2}
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <Breadcrumb
                                items={[
                                {
                                    href: '/',
                                    title: <HomeOutlined />,
                                },
                                {
                                    href: '/datacenter',
                                    title: (
                                    <>
                                        <UserOutlined />
                                        <span>Data center</span>
                                    </>
                                    ),
                                },
                                {
                                    href: '/specandcompair',
                                    title: 'Specification & Comparison',
                                },
                                {
                                    title: 'Comparison',
                                },
                                ]}
                            />
                            <Row gutter={16}>
                                <Col span={6}>
                                    
                                </Col>
                                <Col span={6}>
                                    <Card bordered={false}>
                                        <Dropdown
                                            menu={{
                                            items,
                                            }}
                                        >
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    Model
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card bordered={false}>
                                        <Dropdown
                                            menu={{
                                            items,
                                            }}
                                        >
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    Model
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card bordered={false}>
                                        <Dropdown
                                            menu={{
                                            items,
                                            }}
                                        >
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    Model
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </Card>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Card bordered={false}>
                                        <p><b>ข้อมูลสินค้า</b></p>
                                        <p>4 Ordercode</p>
                                        <p>5 Descreption </p>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card bordered={false}>
                                        <p><b>ข้อมูลสินค้า</b></p>
                                        <p>4 Ordercode</p>
                                        <p>5 Descreption </p>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card bordered={false}>
                                        <p><b>ข้อมูลสินค้า</b></p>
                                        <p>4 Ordercode</p>
                                        <p>5 Descreption </p>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card bordered={false}>
                                        <p><b>ข้อมูลสินค้า</b></p>
                                        <p>4 Ordercode</p>
                                        <p>5 Descreption </p>
                                    </Card>
                                </Col>
                            </Row>
                        </Space>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </>
  )
}
