import React from "react";
import { Button, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteBoard } from "../../store/action/boardAction";

import "./BoardCard.css";

export default function BoardCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function removeBoard(e, id) {
    e.stopPropagation();
    if (props.userId === props.ownerId) {
      dispatch(deleteBoard(id));
    } else {
      message.error("Unauthorized");
    }
  }

  function navigateBoard(id) {
    navigate(`/dashboard/${id}`);
  }

  return (
    <div className="boardCard" onClick={()=>{navigateBoard(props.id);}}>
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
          onClick={(e)=>{removeBoard(e, props.id);}}
        ></Button>

        <p>{props.userId === props.ownerId ? "Owner": "Member"}</p>
      </div>
    </div>
  );
}
