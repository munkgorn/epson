import React, {useState,useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import { modelState } from '@/store/info';
import{ Select, Form,Layout,theme,Breadcrumb,Menu,message,Col, Card, Space, Row, Descriptions, Divider, Button } from 'antd';
import { LaptopOutlined, NotificationOutlined,DownOutlined,HomeOutlined ,UserOutlined   } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { apiClient } from '@/utils/apiClient';
import _ from 'lodash';
const { Content,Sider  } = Layout;
const { Meta } = Card;

const items = [
    {
        key: 'specification',
        label: (<><UserOutlined /> Specification</>),
        path: '/specification' // use path for redirect
    },
    {
        key: 'comparison',
        label: (<><LaptopOutlined /> Specification</>),
        path: '/comparison'
    },
];
const Specification = () => {
    const [form] = Form.useForm();
    const model = useRecoilValue(modelState);
    const [series, setSeries] = useState([]);
    const [optionSeries, setOptionSeries] = useState([])
    const [selectedSeries, setSelectedSeries] = useState([]);
    const [columns, setColumns] = useState();
    const [spec, setSpec] = useState({});
    const [disabledDownload, setDisabledDownload] = useState(true)
    const router = useRouter();

    const getSeries = async () => {
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
    
    const filterOption = (input, option) => {
        let inputLow = _.join(_.split(_.lowerCase(input),' '),'');
        let labelLow = _.join(_.split(_.lowerCase(option?.label),' '),'');
        return _.startsWith(labelLow, inputLow) ||inputLow==labelLow
    }

    const getSpecification = async (idseries) => {
        let key = 'series'
        message.loading({key:key,content:'loading ...'});
        let result = await apiClient().get('/specification',{params:{['v.id_series']: idseries}}).catch(e => message.error({key:key,content:'error content'}));
        if (_.size(result?.data)==1) {
            console.log(result.data[0])
            setSpec(result?.data[0]);
            message.success({key:key,content:'load '+key+' success'})
        }
    }

    const getColumn = async () => {
        message.loading({key:'column',content:'loading column...'});
        let cols = await apiClient().get('/column',{params:{id_model: model.id}}).catch(e => message.error({key:'column',content:'error content'}));
        if (_.size(cols?.data)>0) {
            console.log('cols',cols.data)
            setColumns(cols.data);
            message.success({key:'column',content:'load column success'})
        }
    }
    
    const getValue = async(idseries) => {
        message.loading({key:'series',content:'loading series...'});
        let cols = await apiClient().get('/column',{params:{id_model: model.id}}).catch(e => message.error({key:'column',content:'error content'}));
        let result = await apiClient().get('/value',{params:{id_series: idseries}}).catch(e => message.error({key:'series',content:'error content'}));
        if (_.size(result?.data)>0) {
            console.log(cols)
            setSelectedSeries(result.data)
            message.success({key:'series',content:'load series success'})
        }
    }

    const {
        token: { colorBgContainer },
      } = theme.useToken();

      
    const onValuesChange = async(change,all) => {
        if (change?.series) {
            setDisabledDownload(false);
            await getSpecification(change.series);
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
                            defaultSelectedKeys={['specification']}
                            // defaultOpenKeys={['sub1']}
                            style={{
                                height: '100%',
                            }}
                            items={items}
                            onClick={({item,key,keyPath,domEvent})=>router.push(item?.props?.path)}
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
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
                                        title: 'Specification',
                                    },
                                ]}
                            />
                            <Card>
                                <Row gutter={[12,12]}>
                                    <Col span={12}>
                                        <h3>Specification</h3>
                                        <Form form={form} onValuesChange={onValuesChange}>
                                        <Form.Item name={'series'}>
                                            <Select 
                                                filterOption={filterOption}
                                                options={optionSeries} 
                                                placeholder="Modal" 
                                                showSearch 
                                                style={{width:'100%'}} />
                                        </Form.Item>
                                        </Form>
                                    </Col>
                                    <Col span={12} style={{marginTop: '25px'}}>
                                        <Descriptions column={1}>
                                            <Descriptions.Item label="Search Model Name">{spec?.description || '-'}</Descriptions.Item>
                                            <Descriptions.Item label="Search Compatible">{spec?.compatible || '-'}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row>
                                    <Col span={12}>
                                        <Descriptions column={1} title="ข้อมูลสินค้า">
                                            <Descriptions.Item label="Ordercode">{spec?.ordercode || '-'}</Descriptions.Item>
                                            <Descriptions.Item label="Description">{spec?.description || '-'}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                    <Col span={12}>
                                        <Descriptions column={1} title="ราคาสินค้า">
                                            <Descriptions.Item label="ราคาก่อน Vat%">{spec?.msrp || 0}</Descriptions.Item>
                                            <Descriptions.Item label="ราคาหลัง Vat%">{spec?.msrp_vat || 0}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row>
                                    <Col span={12}>
                                        <Descriptions column={1} title="รายละเอียดสินค้า">
                                            <Descriptions.Item label="Status">{spec?.status || '-'}</Descriptions.Item>
                                            <Descriptions.Item label="Specs / Length (m)">{spec?.specs_length_m || '-'}</Descriptions.Item>
                                            <Descriptions.Item label="Brochure">{spec?.brochure ? <a href={spec.brochure} download>Download Brochure</a> : '-'}</Descriptions.Item>
                                            <Descriptions.Item label="Bundle Items">{spec?.bundle_items || '-'}</Descriptions.Item>
                                            <Descriptions.Item label="Remark">{spec?.remark || '-'}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                    <Col span={12}>
                                        <Descriptions column={1} title="Warranty">
                                            <Descriptions.Item label="STD warranty term">{spec?.std_warranty_term || 0}</Descriptions.Item>
                                            <Descriptions.Item label="Lamp / Light source / Head">{spec?.lamp_light_source_head || 0}</Descriptions.Item>
                                            <Descriptions.Item label="Service Type">{spec?.service_type || 0}</Descriptions.Item>
                                            <Descriptions.Item>
                                                <Button disabled={disabledDownload}>Download</Button>
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                </Row>
                            </Card>
                        </Space>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </>
  )
}

export default Specification;