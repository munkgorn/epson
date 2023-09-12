import React, {useState,useEffect,useContext} from "react";
import {useRecoilState} from 'recoil';
import { modelState } from '@/store/info';
import Link from 'next/link';
import { useRouter } from "next/router";
import { Card, Space,Col, Row, Breadcrumb, message,Button } from "antd";
import {
	HomeOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { apiClient } from '../utils/apiClient';
import _ from 'lodash';

const { Meta } = Card;

const Specandcompair = () =>  {
	const [model,setModel] = useRecoilState(modelState);
	const router = useRouter();
    const [lists, setLists] = useState([]);

	console.log('store',model)
    const getLists = async () => {
        message.loading({key:'init',content:'loading...'})
        const models = await apiClient().get('/model');
        console.log(models);
        setLists(models.data)
        if (_.size(models?.data)>0) {
            message.success({key:'init',content:'Load model success'})
        } else {
            message.error({key:'inti',content:'Cannot load model'});
        }
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
							<Button type="link" onClick={()=>{
								setModel(model)
								router.push("/specification");
							}}>
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
							</Button>
						</Col>
						))
					}
					</Row>
				</Card>
			</Space>
		</>
	);
};
export default Specandcompair;