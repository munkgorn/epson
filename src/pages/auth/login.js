import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Form, Input, Button, message } from 'antd';

export default function Login() {
    const router = useRouter();
    const {data:session, status} = useSession();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
      await signIn('credentials', {...values, callbackUrl: '/' })
    };

    useEffect(() => {
      if (status==='authenticated') {
        router.push('/')
      } else if (status=='unauthenticated' && router?.query?.error) {
        message.error(router.query.error)
      }
    }, [status])
    
    
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
