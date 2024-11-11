import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await login(values);
      message.success('登录成功');
      navigate('/');
    } catch (error) {
      message.error(error.message || '登录失败，请检查用户名和密码');
    }
  };

  return (
    <div className="login-container">
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>
        货车司机信息管理系统
      </h1>
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input 
            size="large" 
            placeholder="用户名"
            autoComplete="username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password 
            size="large" 
            placeholder="密码"
            autoComplete="current-password"
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            block
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
