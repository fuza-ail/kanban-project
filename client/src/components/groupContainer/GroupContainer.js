import React, { useState } from "react";
import axios from "axios";
import { Input, Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import TaskItem from  "../taskItem/taskItem";
import { AddTask, DeleteGroup, UpdateTask } from "../../store/action/groupAction";

import "./GroupContainer.css";
import { baseUrl } from "../../constants/url";
import { ItemTypes } from "../../constants/item";

export default function GroupContainer(props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [isAddShow, setIsAddShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("access-token");

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor)=>{
      axios({
        method: "put",
        url: `${baseUrl}/tasks/${item.task.id}`,
        data: {
          group_id: props.groupId
        },
        headers: {
          access_token: accessToken
        }
      }).then(()=>{
        // const { data } = res.data;
        dispatch(UpdateTask({
          originGroupId: item.groupId,
          destinationGroupId: props.groupId,
          task: item.task
        }));
      }).catch(err=>{
        console.log(err.response);
      });
      
    },
    collect: monitor=>({
      isOver: !!monitor.isOver()
    })
  });



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
      setIsAddShow(false);
      dispatch(AddTask({
        task: {
          id: data.id,
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
    <div 
      className="groupContainer" 
      ref={drop} 
      style={{ backgroundColor: isOver?"grey":"rgba(128, 128, 128, 0.301)" }}
    >
      <div className="groupContainer-task">
        <div className="header">
          <h3>{props.statusName}</h3>
          <Popconfirm
            title="Are you sure "
            visible={visible}
            onConfirm={removeGroup}
            onCancel={handleCancel}
          >
            <Button 
              icon={<DeleteOutlined />} 
              type="danger" 
              onClick={showPopconfirm}
            />
          </Popconfirm>
        </div>

        {props.tasks.map((el, idx)=>{
          return (
            <TaskItem 
              key={idx}
              groupId = {props.groupId}
              task={el}
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
