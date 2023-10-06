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
import MyModel2 from '@/components/myModel2';
import { useRecoilState } from 'recoil';
import { selectModel2State } from '@/store/data';
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
const columns = [
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
const data = [];
export default function Index() {
  const [selectModel2, setSelectModel2] = useRecoilState(selectModel2State);
  console.log(selectModel2)
  const [itemsModel, setItems] = useState([]);
  const [manual, setSelectedManual] = useState(null);
  const [diagram, setSelectedDiagram] = useState(null);
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
    <Row justify="center" gutter={[24,24]}>
      <Col span={24}>
        <MyModel2 />
      </Col>
      <Col span={24}>
        <Space>
        {selectModel2?.manual && (
          <a href={`upload/manual/${selectModel2?.manual}`} target="_blank" rel="noopener noreferrer">
            <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large">
              Service Manual {selectModel2?.manual}
            </Button>
          </a>
        )}
        {selectModel2?.diagram && (
          <a href={`upload/diagram/${selectModel2?.diagram}`} target="_blank" rel="noopener noreferrer">
            <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large">
              Diagram {selectModel2?.diagram}
            </Button>
          </a>
        )}
        </Space>
      </Col>
    </Row>
  );
}
