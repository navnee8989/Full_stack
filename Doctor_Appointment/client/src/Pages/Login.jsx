import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "../styles/Register.css";

const onFinish = (values) => {
  console.log("Success:", values);
};

const Login = () => (
  <div className="form-container">
    <h1 className="text-center">Register Form</h1>
    <div className="div w-50">
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
        className=" p-2"
      >
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
          <Button
            type="primary"
            htmlType="submit"
            className="d-flex justify-content-center align-items-center"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
);
export default Login;
