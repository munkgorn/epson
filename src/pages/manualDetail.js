import React, {useState,useEffect} from 'react';
import { Breadcrumb, Card, Space, Col, Divider, Row, AutoComplete, Input, message  } from 'antd';
import { HomeOutlined ,UserOutlined   } from '@ant-design/icons';
import { apiClient } from '../utils/apiClient';
import { useRouter } from 'next/router';
import _ from 'lodash';
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
    const [series, setSeries] = useState([])
    const router = useRouter();
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log('onSelect', value);
  };
  const getModels = async() => {
    message.loading({
      key: 'init',
      content: 'loading model...'
    })
    const result = await apiClient().get('/model');
    setOptions(result?.data);
    if (_.size(result?.data)>0) {
      message.success({
        key: 'init',
        content: 'load models success...'
      })
    } else {
      message.error({
        key:'init',
        content: 'cannot load models'
      })
    }
  }
  const getModel = async(modalname) => {
    message.loading({
      key: 'init',
      content: 'loading model...'
    })
    const result = await apiClient().get('/model', {params:{model_name: modalname}});
    console.log('model', _.head(result.data))
    message.success({
      key:'init',
      content:'load model success'
    })
    return _.result(result,'data[0]');
  }
  const getSeries = async(modelID) => { 
    console.log('getseries',modelID)
    if (modelID){
      message.success({
        key:'init',
        content:'loading series...'
      })
      const result = await apiClient().get('/series', {params:{id_model:modelID}});
      console.log('sereies', result.data)
      setSeries(result.data)
      message.success({
        key:'init',
        content:'load series success'
      })
    } else {
      message.error('Not found model id');
    }
      
  }
  useEffect(() => {
    (async()=>{
      if (_.size(options)==0) {
        await getModels();
      }
    })()
  }, [options])
  
  useEffect(() => {
    (async()=>{
      if (router?.query?.model) {
        let result = await getModel(router?.query?.model)
        
        if (result?.id) {
          console.log(result.id)
          await getSeries(result.id);
        }
      }
    })()
  }, [router?.query])
  
  
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
                          value={router?.query?.model}
                          >
                          <Input.Search size="large" placeholder="input here" enterButton />
                        </AutoComplete>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={20}  style={{ margin: '10px' }}>
                        <p><b>Items</b></p>
                        {
                          _.size(series)>0 ? _.map(series, (ser,i) => (<p>{++i}. {ser.series_name}</p>)) : <p></p>
                        }
                    </Col>
                </Row>
            </Card>
        </Space>
    </>
  )
}
