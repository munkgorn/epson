import React, { useState } from 'react';
import { Col, Divider, Row } from 'antd';
import { Card, Space, Button } from 'antd';
import { AlertOutlined, SolutionOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { AutoComplete, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import axios from 'axios';
import { Breadcrumb,Menu } from 'antd';
import { Layout,theme,  } from 'antd';
import { LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';
const { Content,Sider  } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items2 = [
  getItem(
      <a href="/projector">Data Analytic</a>,
      'intrlligentDetail',
      <UserOutlined />,
    ),
    getItem(
      <a href="/projectorServiceManual">Service Manual & Diagram</a>,
      'serviceManual',
      <LaptopOutlined />,
    ),
];
const columns = [
  {
    title: 'Item',
    dataIndex: 'item',
    key: 'item',
  },
  {
    title: 'Current Value',
    dataIndex: 'currentValue',
    key: 'currentValue',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: 'Limit',
    dataIndex: 'limit',
    key: 'limit',
  },
];
const data = [
  {
    key: '1',
    item: 'Total print page',
    currentValue: 657,
    unit: 'Sheet',
    limit: '400,000',
  },
];
const columnsResult = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'Symptom / Detail',
    dataIndex: 'symptom',
    key: 'symptom',
  },
  {
    title: 'Remedy',
    dataIndex: 'remedy',
    key: 'remedy',
  },
  {
    title: 'Part Code',
    dataIndex: 'part',
    key: 'part',
  },
];
const dataResult = [
  {
    key: '1',
    no: '1',
    symptom: 'Total Print 136,000 ㎡',
    remedy: 'Replace Print Head',
    part: 'FA61002 “Print Head”',
  },
];
const { Dragger } = Upload;
const { Meta } = Card;

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="#">
        Model item
      </a>
    ),
  },
];

export default function Index() {
  const [responseData, setResponseData] = useState([]);

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log('start send axios');
    
      const response = await axios.post(props.action, formData);
      setResponseData(response);
      console.log('get data');
      console.log(response);
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // console.log(response.data.data);
        setResponseData(response.data.data); // Update state with response data
      } else {
        console.log('Empty response data or invalid format');
        setResponseData([]); // Set an empty array if no response data or invalid format
      }
    } catch (error) {
      console.error(error);
      setResponseData([]); // Set an empty array if an error occurs
    }

    console.log('end send axios');
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const filteredResponseData = responseData.filter(row => row.length > 1);
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
                    defaultSelectedKeys={['intrlligentDetail']}
                    // defaultOpenKeys={['sub1']}
                    style={{
                        height: '100%',
                    }}
                    items={items2}
                />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
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
                            href: '/intelligent',
                            title: (
                              <>
                                <UserOutlined />
                                <span>Intelligent</span>
                              </>
                            ),
                          },
                          {
                            title: 'Projector',
                          },
                          {
                            title: 'Data Analytic',
                          },
                        ]}
                      />
                    </Col>
                  </Row>
                  <Card>
                    <Row justify="center">
                      <Col span={20} style={{ margin: '10px' }}>
                        <p>
                          <b>Model</b>
                        </p>
                        <Dropdown
                          menu={{
                            items,
                          }}
                        >
                          <a onClick={(e) => e.preventDefault()}>
                            <Space>
                              Select
                              <DownOutlined />
                            </Space>
                          </a>
                        </Dropdown>
                      </Col>
                    </Row>
                    <Row justify="center">
                      <Col span={20} style={{ margin: '10px' }}>
                        <Dragger
                          // {...props}
                          // onChange={(info) => {
                          //   const { status, originFileObj } = info.file;
                          //   if (status === 'done') {
                          //     handleUpload(originFileObj);
                          //   }
                          // }}
                        >
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">Click or drag file to this area to upload</p>
                          <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned
                            files.
                          </p>
                        </Dragger>
                      </Col>
                    </Row>
                    <Row justify="center" style={{ margin: '20px' }}>
                      <Col span={20} style={{ margin: '10px' }}>
                        <Table columns={columns} dataSource={data} />
                      </Col>
                    </Row>
                    <Row justify="center" style={{ margin: '20px' }}>
                      <Col span={20} style={{ margin: '10px' }}>
                        <Table columns={columnsResult} dataSource={dataResult} />
                      </Col>
                    </Row>
                  </Card>
                </Space>
              </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
}
