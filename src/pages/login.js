import React from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import { Card } from 'antd';
export default function index() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        // Simulate an API call or perform authentication logic here
        setTimeout(() => {
        console.log('Form values:', values);
        setLoading(false);
        router.push('/home'); // Redirect to "/home" page
        }, 2000);
    };
    return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <Form name="login" onFinish={onFinish} layout="vertical">
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please enter your username' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please enter your password' }]}
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
