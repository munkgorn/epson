import React, {useState,useEffect} from 'react';
import {useRecoilState} from 'recoil';
import { modelState } from '@/store/info';
import{  Col, Card, Space, Row,Dropdown,Breadcrumb,Menu,Layout,theme, message, Select, Form, Table  } from 'antd';
import { LaptopOutlined,DownOutlined,HomeOutlined ,UserOutlined   } from '@ant-design/icons';
import _ from 'lodash';
import { apiClient } from '@/utils/apiClient';
import { useRouter } from 'next/router';
const { Content,Sider  } = Layout;
const { Meta } = Card;
function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
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
  const items2 = [
    getItem(
        <a href="/specification">Specification</a>,
        'specification',
        <UserOutlined />,
      ),
      getItem(
        <a href="/comparison">Comparison</a>,
        'comparison',
        <LaptopOutlined />,
      ),
  ];
const Comparison = () => {
    const { token: { colorBgContainer }, } = theme.useToken();
    const [model,setModel] = useRecoilState(modelState);
    const router = useRouter();
    const [series, setSeries] = useState([]);
    const [optionSeries, setOptionSeries] = useState([])
    const [form] = Form.useForm();
    const [selectedSeries, setSelectedSeries] = useState([]);
    const [dataSource, setDataSource] = useState([])

    const filterOption = (input, option) => {
        let inputLow = _.join(_.split(_.lowerCase(input),' '),'');
        let labelLow = _.join(_.split(_.lowerCase(option?.label),' '),'');
        return _.startsWith(labelLow, inputLow) ||inputLow==labelLow
    }

    const tableColumn = [
        {
            title:'',
            dataIndex:'head',
            key:'head',
            rowScope: 'row',
        },
        {
            title: (
                <Form.Item name={['series','1']}>
                    <Select 
                        filterOption={filterOption}
                        options={optionSeries} 
                        placeholder="Modal" 
                        showSearch 
                        style={{width:'100%'}} />
                </Form.Item>
            ),
            dataIndex:'compare1',
            key: 'compare1'
        },
        {
            title: (
                <Form.Item name={['series','2']}>
                    <Select 
                        filterOption={filterOption}
                        options={_.filter(optionSeries, f => selectedSeries[0]!=f.value)} 
                        placeholder="Modal" 
                        showSearch 
                        style={{width:'100%'}} />
                </Form.Item>
            ),
            dataIndex:'compare2',
            key: 'compare2'
        },
        {
            title: (
                <Form.Item name={['series','3']}>
                    <Select 
                        filterOption={filterOption}
                        options={_.filter(optionSeries, f => selectedSeries[0]!=f.value && selectedSeries[1]!=f.value)} 
                        placeholder="Modal" 
                        showSearch 
                        style={{width:'100%'}} />
                </Form.Item>
            ),
            dataIndex:'compare3',
            key: 'compare3'
        }
    ]


    const getSeries = async() => {
        message.loading({key:'series',content:'loading series...'});
        console.log(model)
        // let resultModel = await apiClient().get('/model');
        let resultSeries = await apiClient().get('/series',{params:{id_model: model.id}}).catch(e => message.error({key:'series',content:'error series'}));
        if (_.size(resultSeries?.data)>0) {
            setSeries(resultSeries.data)
            console.log(resultSeries.data)
            setOptionSeries(_.map(resultSeries.data, v => ({label:v?.series_name,value:v?.id})))
            message.success({key:'series',content:'load series succes'})
        }
    }

    const getColumn = async () => {
        message.loading({key:'column',content:'loading column...'});
        let cols = await apiClient().get('/column',{params:{id_model: model.id}}).catch(e => message.error({key:'column',content:'error content'}));
        if (_.size(cols?.data)>0) {
            console.log('cols',cols.data)
            // setColumns(cols.data);
            setDataSource(_.map(cols.data, v => ({
                key:v.id,
                head: v.column_name,
                compare1: '',
                compare2: '',
                compare3: '',
            })))
            message.success({key:'column',content:'load column success'})
        }
    }

    const getValue = async(key,idseries) => {
        message.loading({key:'series',content:'loading series...'});
        let result = await apiClient().get('/value',{params:{id_series: idseries}}).catch(e => message.error({key:'series',content:'error content'}));
        console.log(result)
        if (_.size(result?.data)>0) {
            console.log('data',result.data)
            // setValues({
            //     ...values,
            //     [key]: result.data
            // });

            console.log(dataSource)
            
            setDataSource(_.map(dataSource, v => {
                return {
                    ...v,
                    ['compare'+key]: _.result(_.find(result.data, ({id_column:v.key})), 'val')
                }
            }))
            message.success({key:'series',content:'load series success'})
        }
    }

    const onValuesChange = async(change,all) => {
        if (change?.series) {
            setSelectedSeries(_.values(all.series))
            
            let k = _.head(_.keys(change.series))
            let v = _.head(_.values(change.series))
            console.log(change.series, k, v)
            await getValue(k, v);
        }
    }

    useEffect(() => {
      (async()=>{
        if (_.size(series)==0 && model) {
            await getSeries();
            await getColumn();
        }
      })()
    }, [series])

    useEffect(() => {
      console.log('dataSource',dataSource)
    }, [dataSource])
    

    useEffect(() => {
      console.log('model',model)
      if (!model) {
        router.push('/specandcompair?error=nomodel')
      }
    }, [model])
    
    
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
                        defaultSelectedKeys={['comparison']}
                        // defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                        }}
                        items={items2}
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Form form={form} onValuesChange={onValuesChange}>
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
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
                                        <span>Data center</span>
                                    </>
                                    ),
                                },
                                {
                                    href: '/specandcompair',
                                    title: 'Specification & Comparison',
                                },
                                {
                                    title: 'Comparison',
                                },
                                ]}
                            />
                            <Row>
                                <Col span={24}>
                                    <Table bordered dataSource={dataSource} columns={tableColumn} pagination={{pageSize: _.size(dataSource), hideOnSinglePage:true}} />
                                </Col>
                            </Row>
                        </Space>
                        </Form>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </>
  )
}

export default Comparison