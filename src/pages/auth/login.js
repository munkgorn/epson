import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Form, Input, Button } from 'antd';

export default function Login() {
    const router = useRouter();
    const {data:session, status} = useSession();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
      console.log('values',values);
      await signIn('credentials', {...values, callbackUrl: '/' })

        // setLoading(true);
        // // Simulate an API call or perform authentication logic here
        // setTimeout(() => {
        // console.log('Form values:', values);
        // setLoading(false);
        // router.push('/'); // Redirect to "/" page
        // }, 2000);
    };

    useEffect(() => {
      console.log(status, session)
      // if (status==='authenticated') {
      //   // router.push('/')
      // }
    }, [status])
    
    
    return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <Form name="login" onFinish={onFinish} layout="vertical" initialValues={{ username: 'munkgorn', password: '123456' }}>
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
