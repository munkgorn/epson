import React, { useEffect,useState } from 'react';
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
      <a href="/projector">Data Analytic</a>,
      'intrlligentDetail',
      <UserOutlined />,
    ),
    getItem(
      <a href="/projectorServiceManual">Service Manual & Diagram</a>,
      <a href="/projectorServiceManual">Service Manual & Diagram</a>,
      'serviceManual',
      <LaptopOutlined />, 
      <LaptopOutlined />, 
    ),
];
export default function Index() {
  const [itemsModel, setItems] = useState([]);
  const [manual, setSelectedManual] = useState(null);
  const [diagram, setSelectedDiagram] = useState(null);
  useEffect(() => {
    fetch('/api/manual/listModel')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const transformedItems = data.map(item => ({
          key: item.model_name,
          label: item.model_name,
          manual: item.manual,
          diagram: item.diagram,
        }));
        setItems(transformedItems);
      });
  }, []);
  const handleModelSelect = (manual, diagram) => {
      setSelectedManual(manual);
      setSelectedDiagram(diagram);
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
                            href: '/',
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
                            title: 'Projector',
                          },
                          {
                            title: 'Service Manual & Diagram',
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
                        <Space wrap>
                        {itemsModel.map(item => (
                            <Button type="primary" onClick={() => handleModelSelect(item.key)}>{item.label}</Button>
                        ))}
                        </Space>
                      </Col>  
                    </Row>
                    <Row justify="center" style={{ margin: '20px' }}>
                      <Col span={20} style={{ margin: '10px' }}>
                        {manual && (
                          <a href={`upload/manual/${manual}`} target="_blank" rel="noopener noreferrer">
                            <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large">
                              Service Manual {manual}
                            </Button>
                          </a>
                        )}

                        {diagram && (
                          <a href={`upload/diagram/${diagram}`} target="_blank" rel="noopener noreferrer">
                            <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large">
                              Diagram {diagram}
                            </Button>
                          </a>
                        )}
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
