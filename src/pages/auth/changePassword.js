import { userState } from '@/store/data';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/router';
import md5 from 'md5';
import dayjs from 'dayjs';
import { apiClient } from '@/utils/apiClient';
import { signIn } from 'next-auth/react';
import { decode } from '@/utils/encryption';

const ChangePassword = () => {
    const router = useRouter();
    const [user,setUser] = useRecoilState(userState);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        if (values?.username && values?.newpassword == values?.confirmpassword) {
            console.log(values)
            // check duplicate old password
            let old = await apiClient().post('/user', {username: values.username})
            if (old?.data?.password == md5(values.newpassword)) {
                message.error('The new password you entered is the same as old password. Please enter a different password.');
            } else {
                let data = {
                    username: values.username,
                    password: md5(values.newpassword),
                    date_changepassword: dayjs().format('YYYY-MM-DD')
                }
                let result = await apiClient().put('/user/update', data);
                if (result.status==200 && result?.data?.changedRows==1) {
                    router.push('/auth/login')
                } else {
                    message.error('Cannot update password, please contact admin')
                }
            }
        } else {
            router.push('/auth/login?error=not_found_username')
        }
    }
    
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 90px)' }}>
          <Form name="login" initialValues={{username: user}} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newpassword"
              rules={[{ required: true, message: 'Please enter your new password' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmpassword"
              rules={[
                { required: true, message: 'Please enter your confirm password' },
                ({getFieldValue}) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('newpassword') === value) {
                            return Promise.resolve();
                        } 
                        return Promise.reject(new Error('Password not match'));
                    }
                })
                ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
  );
}

export default ChangePassword