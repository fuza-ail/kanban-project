import React from "react";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import "./BoardCard.css";

export default function BoardCard(props) {
  return (
    <div className="boardCard">
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <p className="boardCard-date">{props.date}</p>

      <div className="boardCard-action">
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="small"
        ></Button>
        
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          size="small"
        ></Button>
      </div>
    </div>
  );
}
