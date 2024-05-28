import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import "../styles/Register.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/slice/AlertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dipatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await axios.post("/api/users/login", values);
      dipatch(showLoading());
      const token = res.data.data;
      // console.log(token);
      // console.log(res.data);
      if (!res.data.success) {
        message.error(`Login Failed With `);
        toast.error(`Error While Login `);
        dipatch(hideLoading());
      } else {
        localStorage.setItem("token", token);
        // const { username } = res.data.data;
       
        // console.info(token,username);
        toast.success(`User Login Successfull with `);

        navigate("/");
      }
    } catch (error) {
      dipatch(hideLoading());

      console.log(error);
      toast.error("Error While Login");
    }
  };

  return (
    <div className="form-container">
      <h1 className="">Login Form</h1>
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
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
};

export default Login;
