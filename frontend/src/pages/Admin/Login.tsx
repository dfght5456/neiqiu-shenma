import React from 'react';
import { Form, Input, Button, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = (values: any) => {
    if (values.username === 'admin' && values.password === 'litianyu123') {
      login();
      Toast.show({ icon: 'success', content: '登录成功' });
      navigate('/admin/dashboard');
    } else {
      Toast.show({ icon: 'fail', content: '账号或密码错误' });
    }
  };

  return (
    <div style={{ padding: '40px 20px', minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>后台管理系统登录</h2>
        <Form
          form={form}
          onFinish={onFinish}
          footer={
            <Button block type='submit' color='primary' size='large'>
              登录
            </Button>
          }
        >
          <Form.Item name='username' label='账号' rules={[{ required: true, message: '请输入账号' }]}>
            <Input placeholder='请输入账号' />
          </Form.Item>
          <Form.Item name='password' label='密码' rules={[{ required: true, message: '请输入密码' }]}>
            <Input placeholder='请输入密码' type='password' />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
