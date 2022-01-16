import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { LogoutOutlined, ExclamationCircleOutlined  } from "@ant-design/icons";
import { AuthContext } from "../../auth/auth";

export default function Logout() {
  const navigate = useNavigate();
  const {  setIsLogin } = useContext(AuthContext);
  
  function confirm() {
    Modal.confirm({
      title: "Logout",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure want to logout?",
      okText: "Yes",
      cancelText: "Cancel",
      async onOk() { 
        return new Promise((resolve, _) => {
          setTimeout(()=>{
            resolve(null);
            localStorage.clear();
            setIsLogin(false);
            navigate("/");
          }, 1000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  }

  return (
    <div>
      <Button 
        type="danger"
        icon={<LogoutOutlined />}
        onClick={confirm}
      >
        Logout
      </Button>
    </div>
  );
}
