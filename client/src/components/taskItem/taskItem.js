import React from "react";

import "./TaskItem.css";

export default function TaskItem(props) {
  return (
    <div className="taskItem">
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <p className="date">{props.createdAt}</p>
    </div>
  );
}
