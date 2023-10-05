import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Form, Input, Button, message } from 'antd';
import { apiClient } from '@/utils/apiClient';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/data';

export default function Login() {
    const router = useRouter();
    const {data:session, status} = useSession();
    const [loading, setLoading] = useState(false);
    const [user,setUser] = useRecoilState(userState);

    const checkPassword3Month = async (username) => {
      let result = await apiClient().post('/user', {username: username})
      let condition = dayjs(_.result(result, 'data[0].date_changepassword')).isBefore(dayjs().subtract(3,'months').format('YYYY-MM-DD'), 'day'); // > 3 month true
      console.log(condition);
      return condition
    }

    const onFinish = async (values) => {
      const passed = await checkPassword3Month(values?.username);
      if (passed) {
        setUser(values?.username);
        router.push('/auth/changePassword');
      } else {
        await signIn('credentials', {...values, callbackUrl: '/' })
      }
      
    };

    useEffect(() => {
      if (status==='authenticated') {
        router.push('/')
      } else if (status=='unauthenticated' && router?.query?.error) {
        message.error(router.query.error)
      }
    }, [status])
    
    
    return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 90px)' }}>
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
