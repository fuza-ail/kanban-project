import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

import { AuthContext } from "../../auth/auth";
import { baseUrl } from "../../constants/url";

import "./AuthContainer.css";

export default function AuthContainer() {
  const [authType, setAuthType] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {  setIsLogin } = useContext(AuthContext);

  function onSubmit(values) {
    const { email, password } = values;
    let url = "";

    if (authType === "login") {
      url = `${baseUrl}/login`;
    }

    if (authType === "register") {
      url = `${baseUrl}/register`;
    }

    setIsLoading(true);

    axios({
      method: "post",
      url,
      data: {
        email,
        password
      }
    })
      .then(res=>{
        const { data } = res.data;

        setIsLoading(false);
        setIsLogin(true);
        localStorage.setItem("access-token", data.access_token);
        localStorage.setItem("email", data.email);
        navigate("/dashboard");
      }).catch(err=>{
        const { data } = err.response;

        setIsLoading(false);
        message.error(data.message);
      });
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
        autoComplete="on"
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
          <Input.Password placeholder="Password" autoComplete="on"/>
        </Form.Item>

        <Button loading={isLoading} htmlType="submit" type="primary">{authType.toUpperCase()}</Button>
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
