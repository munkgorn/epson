import React, { useState, useEffect } from 'react';
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
      <a href="/otherCheckErrorCodeLIJ">Check Error Code</a>,
      'checkErrorCode',
      <LaptopOutlined />,
    ),
    getItem(
      <a href="/otherServiceManualLIJ">Service Manual & Diagram</a>,
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
const data = [
  {
    key: '1',
    no: '1',
    symptom: 'Total Print 136,000 ㎡',
    remedy: 'Replace Print Head',
    part: 'FA61002 “Print Head”',
  },
];

export default function Index() {
  const [itemsModel, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    fetch('/api/manual/listModelRips')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const transformedItems = data.map(item => ({
          key: item.model_name,
          label: item.model_name,
          manual: item.manual,
          diagram: item.diagram,
          typeModel:'RIPs'
        }));
        setItems(transformedItems);
      });
  }, []);
  const handleModelSelect = item => {
    setSelectedItem(item);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [model, setModel] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [tableData, setTableData] = useState([]);
  const handleModelSelectModel = async (errorCode) => {
    setErrorCode(errorCode);
    try {
      const response = await axios.post('/api/errorCode/find', {
        model: selectedItem,
        errorCode: errorCode,
        type:'RIPs'
      });
      const responseData = response.data.map(item => ({
        key: item.id, // Unique key for each row
        symptom: item.error_name,
        remedy: item.remedy,
        part: item.part_check,
      }));
      setTableData(responseData);
    } catch (error) {
      console.error(error);
    }
    
  };
  return (
    <>
      <Row justify="center">
        <Col span={20} style={{ margin: '10px' }}>
          <a href="https://www.google.com" target="_blank">
              <Button type="primary">Search error code</Button>
          </a>
        </Col>  
      </Row>
    </>
  );
}
