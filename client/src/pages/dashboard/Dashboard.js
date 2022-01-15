import React from "react";
import { Button } from "antd";
import { PlusOutlined, LogoutOutlined } from "@ant-design/icons";

import BoardCard from "../../components/boardCard/BoardCard";

import "./Dashboard.css";

export default function Dashboard() {
  const data = [
    {
      title: "Project pertama",
      description: "project percobaan",
      date: new Date().toISOString()
    },
    {
      title: "project kedua",
      description: "project percobaan",
      date: new Date().toISOString()
    },
    {
      title: "Project ketiga",
      description: "project percobaan",
      date: new Date().toISOString()
    },
    {
      title: "Project keempat",
      description: "project percobaan",
      date: new Date().toISOString()
    },
    {
      title: "Project ",
      description: "project percobaan",
      date: new Date().toISOString()
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="header">
          <div className="header-title">
            <h2>Your Boards</h2>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              size="small" 
            />
          </div>

          <Button 
            type="danger"
            icon={<LogoutOutlined />}
          >
            Logout
          </Button>
        </div>

        <hr />

        <div className='content'>
          {
            data.map((el, idx)=>{
              return (
                <BoardCard 
                  key={idx} 
                  title={el.title}
                  description={el.description}
                  date={el.date}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
