import React, { useEffect, useState } from "react";
import {useRecoilState} from 'recoil';
import { Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import { breadcrumbState, titleState } from "@/store/page";
import _ from 'lodash';
const { Header, Content, Footer, Sider } = Layout;

const Sidebar = () => {
    // const { components: { Menu: {darkItemBg}} } = theme.useToken();
    const [bc,setBc] = useRecoilState(breadcrumbState);
    const [title,setTitle] = useRecoilState(titleState)
    const [currentMenuItem, setCurrentMenuItem] = useState([])
    const router = useRouter();
    const items = [
        { key: 'home', label: 'Home', href: '/' },
        { key: 'datacenter', label: 'Data Center', children: [
            // { key: 'specandcompair', label: 'Specification & Comparison', href: '/specandcompair'},
            { key: 'specification', label: 'Specification', href: '/specification'},
            { key: 'comparison', label: 'Comparison', href: '/comparison'},
            { key: 'manual', label: 'Manual', href: '/manualDetail' },
            { key: 'knowledgebase', label: 'Knowledge Base', href: '/knowledgeBase' },
        ] },
        { key: 'dataanalytic', label: 'Data Analytic', children: [
            // { key: 'manual', label: 'Manual', href: '/manual' },
        ] },
        { key:'divider', type: 'divider' },
        { key: 'logout', label: 'Logout', href: '/auth/logout' },
    ]
    const handleClick = e => {
        let mainKey = e.key;
        let data = [
            {title:'Home',href:'/'}
        ];
        _.map(items, item => {
            if (_.includes(e?.keyPath, item.key)) {
                if (item.key==mainKey) {
                    setTitle(item.label)
                }
                data.push({
                    title: item.label,
                    ...(item?.href ? {href:item.href} : {})
                })
            }
            if (item?.children) {
                _.map(item.children, child => {
                    if (_.includes(e?.keyPath, child.key)) {
                        if (child.key==mainKey) {
                            setTitle(child.label)
                        }
                        data.push({
                            title: child.label,
                            href: child.href
                        })
                    }
                })
            }
        })
        setBc(_.uniqBy(data, 'title'))
        router.push(e?.item?.props?.href)
        // console.log(e.item.props.href)
    }
    
    const findCurrent = (pathname) => {
        let selected = []
        _.map(items, (item) => {
            if (item.href==pathname) {
                selected = [item.key];
            }
            if (item.children) {
                _.map(item.children, child => {
                    if (child.href == pathname) {
                        selected = [item.key, child.key];
                    }
                })
            }
        });
        setCurrentMenuItem(selected)
    }

    useEffect(() => {
        findCurrent(router.pathname)
    }, [router.pathname])

    useEffect(() => {
        console.log('currentMenuItem',currentMenuItem)
    }, [currentMenuItem])
    
    

	return (
		<Sider
            width={300}
            style={{background:'rgb(68,114,196)'}}
            id={'sidebar'}
        >
            <Menu
                id={'menuside'}
                theme={'dark'}
                mode="inline"
                defaultSelectedKeys={['home']}
                defaultOpenKeys={['datacenter','dataanalytic']}
                selectedKeys={currentMenuItem}
                items={items}
                onClick={handleClick}
                style={{background: 'rgb(68,114,196)'}}
            />
        </Sider>
	);
};

export default Sidebar;
