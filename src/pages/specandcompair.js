import React, {useState,useEffect} from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { Col, Row, Breadcrumb, Dropdown } from "antd";
import { Card, Space } from "antd";
import {
	HomeOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { apiClient } from '../utils/apiClient';
import _ from 'lodash';

const { Meta } = Card;
export default function Specandcompair() {
	const router = useRouter();
    const [lists, setLists] = useState([]);

    const getLists = async () => {
        const models = await apiClient().get('/model');
        console.log(models);
        setLists(models.data)
    }

    useEffect(() => {
        (async()=>{
            if (_.size(lists)==0) {
                await getLists();
            }
        })()
    }, [lists])

	return (
		<>
			<Space
				direction="vertical"
				size="middle"
				style={{ display: "flex" }}
			>
				<Row justify="center">
					<Col span={20}>
						<Breadcrumb
							items={[
								{
									href: "/",
									title: <HomeOutlined />,
								},
								{
									href: "/datacenter",
									title: (
										<>
											<UserOutlined />
											<span>Data Center</span>
										</>
									),
								},
								{
									title: "Specification & Comparison",
								},
							]}
						/>
					</Col>
				</Row>
				<Card>
					<Row justify="center">
					{
						_.size(lists)>0 && _.map(lists, model => (
						<Col span={6}>
							<Link href={"/manualDetail?model="+model.model_name}>
								<Card
									hoverable
									style={{
										textAlign: 'center',
										height:320,
									}}
									cover={<img alt="example" src={"images/m"+model.id+".png"} />}
								>
									<div style={{ marginTop: 'auto' }}>
										<Meta title={model.model_name} description="" />
									</div>
								</Card>
							</Link>
						</Col>
						))
					}
					</Row>
				</Card>
			</Space>
		</>
	);
}
