import React from 'react';
import{  Col, Divider, Row  } from 'antd';
import { Card, Space } from 'antd';
import { AlertOutlined,SolutionOutlined,HomeOutlined ,UserOutlined   } from '@ant-design/icons';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Breadcrumb } from 'antd';
const { Meta } = Card;
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
                            <span>Data center</span>
                        </>
                        ),
                    },
                    {
                        title: 'Specification for Call Center',
                    },
                    ]}
                />
                </Col>
            </Row>
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
    </>
  )
}
