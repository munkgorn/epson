import React from 'react';
import {useRecoilValue} from 'recoil';
import { modelState } from '@/store/info';
import{  Layout,theme,Breadcrumb,Menu,Dropdown,Col, Card, Space, Row  } from 'antd';
import { LaptopOutlined, NotificationOutlined,DownOutlined,HomeOutlined ,UserOutlined   } from '@ant-design/icons';
import { useRouter } from 'next/router';
import _ from 'lodash';
const { Content,Sider  } = Layout;
const { Meta } = Card;

const items = [
    {
        key: 'specification',
        label: (<><UserOutlined /> Specification</>),
        path: '/specification' // use path for redirect
    },
    {
        key: 'comparison',
        label: (<><LaptopOutlined /> Specification</>),
        path: '/comparison'
    },
];
const Specification = () => {
    const model = useRecoilValue(modelState);
    const router = useRouter();
    console.log('model is ',model)
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
                            defaultSelectedKeys={['specification']}
                            // defaultOpenKeys={['sub1']}
                            style={{
                                height: '100%',
                            }}
                            items={items}
                            onClick={({item,key,keyPath,domEvent})=>router.push(item?.props?.path)}
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
                                        title: 'Specification',
                                    },
                                ]}
                            />
                            <Card>
                                <Row justify="center">
                                    <Col span={10}  style={{ margin: '20px', marginTop: '10px' }}>
                                        <h3>Specification</h3>
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
                                    </Col>
                                    <Col span={10}  style={{ margin: '20px', marginTop: '10px' }}>
                                        <p>Search Model Name: 5 Descreption</p>
                                        <p>Search Compatible: 7 Compatible</p>
                                    </Col>
                                </Row>
                            </Card>
                            <Card>
                                <Row justify="center">
                                    <Col span={10}  style={{ margin: '20px', marginTop: '10px' }}>
                                        <p><b>ข้อมูลสินค้า</b></p>
                                        <p>4 Ordercode</p>
                                        <p>5 Descreption <span>-</span></p>
                                    </Col>
                                    <Col span={10}  style={{ margin: '20px', marginTop: '10px' }}>
                                        <p><b>ราคาสินค้า</b></p>
                                        <p>8 MSRP (ราคาก่อน Vat%)</p>
                                        <p>7 MSRP (ราคาก่อน Vat%)</p>
                                    </Col>
                                </Row>
                            </Card>
                            <Card>
                                <Row justify="center">
                                    <Col span={10}  style={{ margin: '20px', marginTop: '10px' }}>
                                        <p><b>รายละเอียดสินค้า</b></p>
                                        <p>3 Status</p>
                                        <p>-</p>
                                        <p>10 Specs / Length (m)</p>
                                        <p>-</p>
                                        <p>14 Brochure</p>
                                        <p>-</p>
                                        <p>12 Brochure</p>
                                        <p>-</p>
                                        <p>11 Remark</p>
                                        <p>-</p>
                                    </Col>
                                    <Col span={10}  style={{ margin: '20px', marginTop: '10px' }}>
                                        <p><b>13 Warranty</b></p>
                                        <p>STD warranty term</p>
                                        <p>Service Type</p>
                                    </Col>
                                </Row>
                            </Card>
                        </Space>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </>
  )
}

export default Specification;