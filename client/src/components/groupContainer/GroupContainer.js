import React, { useState } from "react";
import { Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import TaskItem from  "../taskItem/taskItem";

import "./GroupContainer.css";

export default function GroupContainer(props) {
  const [isAddShow, setIsAddShow] = useState(false);
  const { TextArea } = Input;

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
          <Input placeholder="Title"/>
          <TextArea placeholder="Description" autoSize={{ minRows: 2, maxRows: 6 }}/>
          <Button type="primary">Add Task</Button>
          <Button onClick={()=>setIsAddShow(false)}>Cancel</Button>
        </div>:""}
    </div>
  );
}
