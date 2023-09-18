import React from "react";
import { Col, Divider, Row } from "antd";
import { Card, Space } from "antd";
import {
	AlertOutlined,
	SolutionOutlined,
	HomeOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Breadcrumb } from "antd";
const { Meta } = Card;
import { AutoComplete, Input } from "antd";
import { useState } from "react";
const getRandomInt = (max, min = 0) =>
	Math.floor(Math.random() * (max - min + 1)) + min;
const searchResult = (query) =>
	new Array(getRandomInt(5))
		.join(".")
		.split(".")
		.map((_, idx) => {
			const category = `${query}${idx}`;
			return {
				value: category,
				label: (
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<span>
							Found {query} on{" "}
							<a
								href={`https://s.taobao.com/search?q=${query}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{category}
							</a>
						</span>
						<span>{getRandomInt(200, 100)} results</span>
					</div>
				),
			};
		});
export default function knowledgeBase() {
	const [options, setOptions] = useState([]);
	const handleSearch = (value) => {
		setOptions(value ? searchResult(value) : []);
	};
	const onSelect = (value) => {
		console.log("onSelect", value);
	};
	return (
		<>
			<Row justify="center">
				<Col span={24}>
					<p>
						<b>Information</b>
					</p>
					<AutoComplete
						style={{
							width: 300,
						}}
						options={options}
						onSelect={onSelect}
						onSearch={handleSearch}
					>
						<Input.Search
							size="large"
							placeholder="input here"
							enterButton
						/>
					</AutoComplete>
				</Col>
				<Col span={24}>
					<p>
						<b>Items</b>
					</p>
					<p>1. การตั้งค่า WiFi</p>
					<p>2. การ Reset Wifi</p>
				</Col>
			</Row>
		</>
	);
}
