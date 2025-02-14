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
import MyModel2 from '@/components/myModel2';
import { useRecoilState } from 'recoil';
import { models2State, selectModel2State } from '@/store/data';
import Link from 'next/link';
const { Content,Sider  } = Layout;
const { Dragger } = Upload;
const { Meta } = Card;

export default function IntrlligentDetail() {
  const [selectModel2, setSelectModel2] = useRecoilState(selectModel2State);
  const [itemsModel, setItems] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const columns = [
    {
      title: 'Item',
      dataIndex: 0,
      key: 'col-0',
    },
    {
      title: 'Current Value',
      dataIndex: 1,
      key: 'col-1',
    },
    {
      title: 'Limit',
      dataIndex: 2,
      key: 'col-2',
    },
    {
      title: 'Situation',
      dataIndex: 3,
      key: 'col-3'
    },
    {
      title: 'End of life',
      dataIndex: 4,
      key: 'col-4',
    },
    {
      title: '',
      dataIndex: 5,
      key: 'col-5',
    },
    {
      title: '',
      dataIndex: 6,
      key: 'col-6',
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
  const dataResult = [];
  
  const propsForDragger = {
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
  // useEffect(() => {
  //   fetch('/api/manual/listModelSC')
  //     .then(response => response.json())
  //     .then(data => {
  //       const transformedItems = data.map(item => ({
  //         key: item.model_name,
  //         label: item.model_name,
  //       }));
  //       setItems(transformedItems);
  //     });
  // }, []);
  
  const handleModelSelect = model => {
    setSelectedModel(model);
    // setSelectedModel([...selectedModel, model]);
  };

  axios.defaults.debug = false;
  const [responseData, setResponseData] = useState([]);
  const [errorData, setErrorData] = useState([]);
  const [errorDataTable, setTableData] = useState([]);
  const handleUpload = async (file) => {
    try {
      if (_.isEmpty(selectModel2)) {
        // Show an error message using Ant Design message.error
        message.error("Please select a model before uploading.");
        return; // Exit the function
      }
      const formData = new FormData();
      formData.append('file', file);
      console.log('start send axios');
    
      const response = await axios.post('/api/uploadExcel', formData);
      setResponseData(response);
      console.log('get data');
      console.log(response);
      let responseData = [];
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // console.log(response.data.data);
        setResponseData(response.data.data);
        setErrorData(response.data.errorData);
        console.log(selectModel2);
        console.log(response.data.errorData[0].symptom);
        let symptomResponse = response.data.errorData[0].symptom;
        try {
          
          const responseErr = await axios.post('/api/errorCode/find', {
            model: selectModel2?.model_name,
            errorCode: symptomResponse,
          });
          console.log(responseErr);
          responseData = responseErr.data.map(item => ({
            key: item.id, // Unique key for each row
            symptom: item.error_name,
            remedy: item.remedy,
            part: item.part_check,
          }));
          console.log('>>>');
          console.log(responseData);
          setTableData(responseData);
        } catch (error) {
          console.error(error);
        }
        const mergedData = [...responseData, ...response.data.errorShow];
        setTableData(mergedData);
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

  const filteredResponseData = responseData.filter(row => row.length > 0);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
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
                    <Link onClick={() => handleModelSelect(item.key)}>{item.label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <Link onClick={e => e.preventDefault()}>
              <Space>
                Select <DownOutlined />
              </Space>
            </Link>
          </Dropdown>
          {selectedModel && (
            <p>Selected Model: {selectedModel}</p>
          )}
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20} style={{ margin: '10px' }}>
          <Dragger
            {...propsForDragger}
            onChange={(info) => {
              const { status, originFileObj } = info.file;
              if (status === 'done') {
                handleUpload(originFileObj);
              }
            }}
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
        {filteredResponseData.length > 0 ? (
          <Table
            dataSource={filteredResponseData}
            columns={columns}
            pagination={false} // Remove pagination if not required
          />
        ) : (
          <div>No data to display.</div>
        )}
        </Col>
      </Row>
      <Row justify="center" style={{ margin: '20px' }}>
        <Col span={20} style={{ margin: '10px' }}>
          <Table columns={columnsResult} dataSource={errorDataTable} />
        </Col>
      </Row>
    </>
  );
}
