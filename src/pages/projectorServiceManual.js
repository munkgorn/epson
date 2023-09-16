import React, { useEffect,useState } from 'react';
import { Col, Divider, Row } from 'antd';
import { Card, Space, Button } from 'antd';
import { AlertOutlined, SolutionOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { AutoComplete, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { Table } from 'antd';
import axios from 'axios';
import { Breadcrumb,Menu } from 'antd';
import { Layout,theme,  } from 'antd';
import { LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';
const { Search } = Input;
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
export default function Index() {
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
                    defaultSelectedKeys={['serviceManual']}
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
                            title: 'Service Manual & Diagram',
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
                        {/* <a onClick={() => handleModelSelect(item.key)}>{item.label}</a> */}
                        <Space wrap>
                        {itemsModel.map(item => (
                            <Button type="primary" onClick={() => handleModelSelect(item.key)}>{item.label}</Button>
                        ))}
                        </Space>
                      </Col>
                    </Row>
                    <Row justify="center" style={{ margin: '20px' }}>
                      <Col span={20} style={{ margin: '10px' }}>
                        <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large">
                        Service Manual
                        </Button> 
                        <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large">
                        Diagram
                        </Button>
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
