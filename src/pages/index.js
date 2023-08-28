import React, { useEffect } from 'react';
import{ Breadcrumb, Col, Divider, Row, Card, Space  } from 'antd';
import { AlertOutlined, SolutionOutlined, HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { withAuth } from '../../components/middleware';
const { Meta } = Card;
const Index = () => {
    const {data:session,status} = useSession();
	const router = useRouter();
    useEffect(() => {
        console.log(session?.user)
		if (status==='unauthenticated'){
			router.push('/auth/login');
		}
    }, [session])
    
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
                    ]}
                />
                </Col>
            </Row>
            <Card>
                <Row justify="center" id="card">
                    <Col span={10}  style={{ margin: '20px', marginTop: '10px' }}>
                        <Link href="/datacenter">
                            <Card
                                hoverable
                                style={{
                                // width: 240,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: '16px',
                                }}
                                // cover={<img alt="example" src="images/epson.png" />}
                            >
                                <SolutionOutlined  style={{ fontSize: '24px', color: '#08c',marginBottom: '16px' }}/>
                                <Meta title="Data Center" description="" />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={10}  style={{ margin: '20px', marginTop: '10px' }}>
                        <Link href="/intelligent">
                            <Card
                                hoverable
                                style={{
                                // width: 240,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: '16px',
                                }}
                                // cover={<img alt="example" src="images/epson.png" />}
                            >
                                <AlertOutlined style={{ fontSize: '24px', color: '#08c',marginBottom: '16px' }}/>
                                <Meta title="Data Analytic" description="" />
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Card>
        </Space>
    </>
  )
}

export default withAuth(Index)