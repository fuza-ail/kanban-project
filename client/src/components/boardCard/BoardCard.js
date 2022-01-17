import React from "react";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteBoard } from "../../store/action/boardAction";

import "./BoardCard.css";

export default function BoardCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);

  function removeBoard(e, id) {
    e.stopPropagation();
    if (props.userId === props.ownerId) {
      dispatch(deleteBoard(id));
    } else {
      message.error("Unauthorized");
    }
  }

  function editBoard(e) {
    e.stopPropagation();
    message.warn("Sorry, this feature is still under development");
  }

  function navigateBoard(id) {
    navigate(`/dashboard/${id}`, { state: props.title });
  }

  const handleCancel = (e) => {
    e.stopPropagation();
    setVisible(false);
  };

  const showPopconfirm = (e) => {
    e.stopPropagation();
    setVisible(true);
  };

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
          onClick={(e)=>{editBoard(e);}}
        ></Button>

        <Popconfirm
          title="Are you sure "
          visible={visible}
          onConfirm={(e)=>{removeBoard(e, props.id);}}
          onCancel={(e)=>handleCancel(e)}
        >
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            size="small"
            onClick={(e)=>showPopconfirm(e)}
          ></Button>
        </Popconfirm>
        
        

        <p>{props.userId === props.ownerId ? "Owner": "Member"}</p>
      </div>
    </div>
  );
}
