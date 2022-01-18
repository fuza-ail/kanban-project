import React, { useState } from "react";
import axios from "axios";
import { Input, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import TaskItem from  "../taskItem/taskItem";
import { AddTask } from "../../store/action/groupAction";

import "./GroupContainer.css";
import { baseUrl } from "../../constants/url";

export default function GroupContainer(props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [isAddShow, setIsAddShow] = useState(false);
  const { TextArea } = Input;

  const accessToken = localStorage.getItem("access-token");

  const dispatch = useDispatch();

  function handleTitle(e) {
    setTitle(e.target.value);
    console.log(title);
    console.log(props.groupId);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function addTaskItem() {
    if (!title || !description) {
      message.warning("Please fill title and description");
      return;
    }
    setLoading(true);
    axios({
      method: "post",
      url: `${baseUrl}/tasks`,
      data: {
        title,
        description,
        group_id: props.groupId
      },
      headers: {
        access_token: accessToken
      }
    }).then(res=>{
      const { data } = res.data;
      setLoading(false);
      dispatch(AddTask({
        task: {
          title: data.title,
          description: data.description,
          created_at: data.created_at
        },
        group_id: data.group_id
      }));
    }).catch(err=>{
      const { data } = err.response;
      setLoading(false);
      message.error(data.message);
    });
  }

  return (
    <div className="groupContainer">
      <div className="groupContainer-task">
        <div className="header">
          <h3>{props.statusName}</h3>
          <Button icon={<DeleteOutlined />} />
        </div>

        {props.tasks.map((el, idx)=>{
          return (
            <TaskItem 
              key={idx}
              title={el.title} 
              description={el.description} 
              createdAt={el.created_at} />
            
          );
        })}

        {isAddShow?
          "":
          <Button onClick={()=>setIsAddShow(true)}>Add Task</Button>}
      </div>
      
      {isAddShow?
        <div className="groupContainer-form">
          <Input placeholder="Title" onChange={handleTitle}/>
          <TextArea placeholder="Description" autoSize={{ minRows: 2, maxRows: 6 }} onChange={handleDescription} />
          <Button type="primary" onClick={addTaskItem} loading={loading}> Add</Button>
          <Button onClick={()=>setIsAddShow(false)}>Cancel</Button>
        </div>:""}
    </div>
  );
}
