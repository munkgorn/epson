import React, {useState} from 'react';
import { Breadcrumb, Card, Space, Col, Divider, Row, AutoComplete, Input  } from 'antd';
import { HomeOutlined ,UserOutlined   } from '@ant-design/icons';
import { apiClient } from '../utils/apiClient';
const { Meta } = Card;

const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
const searchResult = async (query) => {
  console.log(query);
  const resultModel = await apiClient().get('/model', {params: {
    model_name: '*'+query+'*'
  }});
  console.log(resultModel)
  return [
    {
      value: 'munkgorn',
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>
            Found {query} on{' '} {'munkgorn'}
          </span>
          <span>{1} results</span>
        </div>
      ),
    }
  ]
}
export default function Index() {
    const [options, setOptions] = useState([]);
    const [models, setModels] = useState([]);
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log('onSelect', value);
  };
  return (
    <>
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
                        href: '/datacenter',
                        title: (
                        <>
                            <UserOutlined />
                            <span>Data Center</span>
                        </>
                        ),
                    },
                    {
                        href: '/manual',
                        title: (
                        <>
                            <UserOutlined />
                            <span>Manual</span>
                        </>
                        ),
                    },
                    {
                        title: 'Inkjet',
                    },
                    ]}
                />
                </Col>
            </Row>
            <Card>
                <Row justify="center">
                    <Col span={20}  style={{ margin: '10px' }}>
                        <p><b>Model</b></p>
                        <AutoComplete
                          style={{
                              width: 300,
                          }}
                          options={options}
                          onSelect={onSelect}
                          onSearch={handleSearch}
                          >
                          <Input.Search size="large" placeholder="input here" enterButton />
                        </AutoComplete>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={20}  style={{ margin: '10px' }}>
                        <p><b>Items</b></p>
                        <p>1. การตั้งค่าเบื้องต้นของ L3210</p>
                        <p>2. การเติมหมึกของ L3210</p>
                    </Col>
                </Row>
            </Card>
        </Space>
    </>
  )
}
