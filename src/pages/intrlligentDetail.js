import React, { useState, useEffect } from 'react';
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
      <a href="/intrlligentDetail">Data Analytic</a>,
      'intrlligentDetail',
      <UserOutlined />,
    ),
    getItem(
      <a href="/checkErrorCode">Check Error Code</a>,
      'checkErrorCode',
      <LaptopOutlined />,
    ),
    getItem(
      <a href="/nvram">NVRAM Viewer</a>,
      'nvram',
      <LaptopOutlined />,
    ),
    getItem(
      <a href="/serviceManual">Service Manual & Diagram</a>,
      'serviceManual',
      <LaptopOutlined />,
    ),
];
// const columns = [
//   {
//     title: '',
//     dataIndex: 0,
//     key: '',
//   },
//   {
//     title: '',
//     dataIndex: 1,
//     key: '',
//   },
//   {
//     title: '',
//     dataIndex: 2,
//     key: '',
//   },
//   {
//     title: '',
//     dataIndex: 3,
//     key: '',
//   },
//   {
//     title: '',
//     dataIndex: 4,
//     key: '',
//   },
//   {
//     title: '',
//     dataIndex: 5,
//     key: '',
//   },
//   {
//     title: '',
//     dataIndex: 6,
//     key: '',
//   },
// ];

// const data = [];

// const props = {
//   name: 'file',
//   multiple: false,
//   action: '/api/upload',
//   method: 'post',
// };
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
  // {
  //   key: '1',
  //   item: 'Total print page',
  //   currentValue: 657,
  //   unit: 'Sheet',
  //   limit: '400,000',
  // },
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
  // {
  //   key: '1',
  //   no: '1',
  //   symptom: 'Total Print 136,000 ㎡',
  //   remedy: 'Replace Print Head',
  //   part: 'FA61002 “Print Head”',
  // },
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
const props = {
  name: 'file',
  multiple: false,
  action: '/api/upload',
  method: 'post',
};
const propsCalculate = {
  name: 'file',
  multiple: false,
  action: '/api/analytic/readfile',
  method: 'post',
};
export default function Index() {
  const [dataResult, setResponseData] = useState([]);
  const [dataResultDetail, setResponseDataDetail] = useState([]);
  const [itemsModel, setItems] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/api/analytic/list')
      .then(response => response.json())
      .then(data => {
        const transformedItems = data.map(item => ({
          key: item.model,
          label: item.model,
        }));
        setItems(transformedItems);
        setSelectedModel('EB-FH52'); // hard code
      });
  }, []);
  
  const handleModelSelect = model => {
    setSelectedModel(model);
  };

  axios.defaults.debug = false;
  const handleUpload = async (file) => {
    console.log(file);
    try {
        const params = {
          filename:file.name,
          model: selectedModel
        };
        axios.post('/api/analytic/readfile', params)
        .then((response) => {
          // console.log('Response:', response.data);
          setResponseData(response.data.errorData);
          setResponseDataDetail(response.data.information);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      
    } catch (error) {
      console.error('API Request Error:', error);
      setResponseData([]); // Set an empty array if there's an error in making the API request
    }
  
    console.log('end send axios');
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const filteredResponseData = dataResult.filter(row => row.length > 0);
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
                            title: 'LFP',
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
                          overlay={
                            <Menu>
                              {itemsModel.map(item => (
                                <Menu.Item key={item.key}>
                                  <a onClick={() => handleModelSelect(item.key)}>{item.label}</a>
                                </Menu.Item>
                              ))}
                            </Menu>
                          }
                        >
                          <a onClick={e => e.preventDefault()}>
                            <Space>
                              Select <DownOutlined />
                            </Space>
                          </a>
                        </Dropdown>
                        {selectedModel && (
                          <p>Selected Model: {selectedModel}</p>
                        )}
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
