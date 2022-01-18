import React, { useState } from "react";
import axios from "axios";
import { Input, Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import TaskItem from  "../taskItem/taskItem";
import { AddTask, DeleteGroup } from "../../store/action/groupAction";

import "./GroupContainer.css";
import { baseUrl } from "../../constants/url";

export default function GroupContainer(props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [isAddShow, setIsAddShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const { TextArea } = Input;

  const accessToken = localStorage.getItem("access-token");

  const dispatch = useDispatch();

  function handleTitle(e) {
    setTitle(e.target.value);

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

  const handleCancel = (e) => {
    e.stopPropagation();
    setVisible(false);
  };

  const showPopconfirm = (e) => {
    e.stopPropagation();
    setVisible(true);
  };

  function removeGroup(e) {
    e.stopPropagation();
    axios({
      method: "delete",
      url: `${baseUrl}/groups/${props.groupId}`,
      headers: {
        access_token: accessToken
      }
    }).then(res=>{
      const { data } = res.data;
      dispatch(DeleteGroup(data.group_id));
    }).catch(err=>{
      const { data } = err.response;
      message.error(data.message);
    });
  }

  return (
    <div className="groupContainer">
      <div className="groupContainer-task">
        <div className="header">
          <h3>{props.statusName}</h3>
          <Popconfirm
            title="Are you sure "
            visible={visible}
            onConfirm={removeGroup}
            onCancel={(e)=>handleCancel(e)}
          >
            <Button 
              icon={<DeleteOutlined />} 
              type="danger" 
              onClick={(e)=>showPopconfirm(e)}
            />
          </Popconfirm>
        </div>

        {props.tasks.map((el, idx)=>{
          return (
            <TaskItem 
              key={idx}
              taskId = {el.id}
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
