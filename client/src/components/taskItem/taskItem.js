import React, { useState } from "react";
import {  Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";

import "./TaskItem.css";
import {  DeleteTask } from "../../store/action/groupAction";
import axios from "axios";
import { baseUrl } from "../../constants/url";

import { ItemTypes } from "../../constants/item";

export default function TaskItem(props) {
  const [visible, setVisible] = useState(false);

  const [{ isDragging }, drag] = useDrag({ 
    item: { 
      groupId: props.groupId,
      task: props.task
    },
    type: ItemTypes.CARD,
    collect: (monitor)=>({
      isDragging: !!monitor.isDragging()
    })
  });

  const accessToken = localStorage.getItem("access-token");

  const dispatch = useDispatch();

  function removeTask(e) {
    e.stopPropagation();
    
    axios({
      method: "delete",
      url: `${baseUrl}/tasks/${props.taskId}`,
      headers: {
        access_token: accessToken
      }
    }).then(res=>{
      const { data } = res.data;
      setVisible(false);
      dispatch(DeleteTask({
        groupId: data.group_id,
        taskId: data.task_id
      }));
    }).catch(err=>{
      const { data } = err.response;
      setVisible(false);
      message.error(data.message);
    });
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
    <div 
      className="taskItem" 
      ref={drag} 
      style={{ backgroundColor: isDragging ? "#b8b8b8":"white" }}
    >
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <div className="taskItem-footer">
        <p className="date">{props.createdAt}</p>
        <Popconfirm
          title="Are you sure "
          visible={visible}
          onConfirm={removeTask}
          onCancel={handleCancel}
        >
          <Button icon={<DeleteOutlined/>} size='small' danger onClick={showPopconfirm}/>
        </Popconfirm>
      </div>
    </div>
  );
}
