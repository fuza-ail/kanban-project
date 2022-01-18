import React from "react";
import {  Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import "./TaskItem.css";

export default function TaskItem(props) {
  return (
    <div className="taskItem">
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <div className="taskItem-footer">
        <p className="date">{props.createdAt}</p>
        <Button icon={<DeleteOutlined/>} size='small' danger/>
      </div>
    </div>
  );
}
