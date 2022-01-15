import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";

import "./AuthContainer.css";

export default function AuthContainer() {
  const [authType, setAuthType] = useState("login");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  function onSubmit(values) {
    console.log(values);
    navigate("/dashboard");

  }

  function onSubmitFailed() {
    console.log("Error input");
  }

  function setLoginType(type) {
    form.resetFields();
    setAuthType(type);
  }

  return (
    <div className="authContainer">
      <h2>{authType.toUpperCase()}</h2>

      <Form
        form={form}
        autoComplete="off"
        onFinish={onSubmit}
        onFinishFailed={onSubmitFailed}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input 
            placeholder="Email" 
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Button htmlType="submit" type="primary">{authType.toUpperCase()}</Button>
      </Form>

      {
        authType === "login" ?
          <p>
            Doesn't have an account?&nbsp;
            <span className="toRegister" onClick={()=>setLoginType("register")}>Register</span>
          </p>: 
          <p>
            Already have an account?&nbsp;
            <span className="toLogin" onClick={()=>setLoginType("login")}>Login</span>
          </p>
      }
    </div>
  );
}
