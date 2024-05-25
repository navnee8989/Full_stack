import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('/api/users/register', values);
      if (response.data.success) {
        message.success("Registered Successfully");
        const {email} = response.data.data
        toast.success(`Registration Complate With ${email}`)
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong on the Register page");
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center">Register Form</h2>
      <div className="w-50">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          className="p-2"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" className="d-flex justify-content-center align-items-center">
              Submit
            </Button>
          </Form.Item>

          <Link to={"/login"} className="text-center d-flex justify-content-end text-dark">
            <span>Already Have an Account? <span className="text-primary">Login</span></span>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
