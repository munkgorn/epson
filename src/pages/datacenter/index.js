import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Col, Card, Space, Row, Breadcrumb } from "antd";
import {
	AlertOutlined,
	SolutionOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import { withAuth } from "../../../components/middleware.js";
import { apiClient } from "../../../components/apiClient.js";
import md5 from "md5";
const { Meta } = Card;

const Index = () => {
	const [first, setFirst] = useState(false)
	useEffect(() => {
	  (async()=>{
		console.log(first)
		if (first==false) {
			let result = await apiClient().post('/user/login', {username:'admin',password:md5('fsoftpro')});
			console.log('result client', result.data)
			setFirst(true);
		}
	  })()
	}, [first])
	
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
									title: "Data Center",
								},
							]}
						/>
					</Col>
				</Row>
				<Card>
					<Row justify="center" id="card">
						<Col
							span={6}
							style={{ margin: "20px", marginTop: "10px" }}
						>
							<Link href="/datacenter/specandcompair">
								<Card
									hoverable
									style={{
										// width: 240,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										textAlign: "center",
										padding: "16px",
									}}
									// cover={<img alt="example" src="images/epson.png" />}
								>
									<SolutionOutlined
										style={{
											fontSize: "24px",
											color: "#08c",
											marginBottom: "16px",
										}}
									/>
									<Meta
										title="Specification & Comparison"
										description=""
									/>
								</Card>
							</Link>
						</Col>
						<Col
							span={6}
							style={{ margin: "20px", marginTop: "10px" }}
						>
							<Link href="/datacenter/manual">
								<Card
									hoverable
									style={{
										// width: 240,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										textAlign: "center",
										padding: "16px",
									}}
									// cover={<img alt="example" src="images/epson.png" />}
								>
									<AlertOutlined
										style={{
											fontSize: "24px",
											color: "#08c",
											marginBottom: "16px",
										}}
									/>
									<Meta title="Manual" description="" />
								</Card>
							</Link>
						</Col>
						<Col
							span={6}
							style={{ margin: "20px", marginTop: "10px" }}
						>
							<Link href="/datacenter/knowledgeBase">
								<Card
									hoverable
									style={{
										// width: 240,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										textAlign: "center",
										padding: "16px",
									}}
									// cover={<img alt="example" src="images/epson.png" />}
								>
									<AlertOutlined
										style={{
											fontSize: "24px",
											color: "#08c",
											marginBottom: "16px",
										}}
									/>
									<Meta
										title="Knowledge Base"
										description=""
									/>
								</Card>
							</Link>
						</Col>
					</Row>
				</Card>
			</Space>
		</>
	);
}

export default withAuth(Index);