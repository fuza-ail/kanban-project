import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import BoardHeader from "../../components/boardHeader/BoardHeader";
import GroupContainer from "../../components/groupContainer/GroupContainer";

import { getGroups } from "../../store/action/groupAction";

import "./Board.css";

export default function Board() {
  const param = useParams();
  const title = useLocation().state;
  const { groups, members, isLoading, isError } = useSelector((state)=>state.groupReducer);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getGroups(Number(param.boardId)));
  }, []);

  function refresh() {
    window.location.reload();
  }

  if (isError) {
    return <h3>Error: something went wrong &nbsp;<span style={{ cursor: "pointer", color: "blue" }} onClick={refresh}>Refresh</span></h3>;
  }

  return (
    <div className="board">
      <div className="board-container">
        <h1>{title.toUpperCase()} BOARD</h1>
        <BoardHeader isLoading={isLoading} members={members} boardId={param.boardId}/>

        <hr />

        {isLoading?
          <h3>Loading...</h3>:
          <div className="group-section">
            {groups.map((el, idx)=>{
              return (
                <GroupContainer 
                  key={idx} 
                  statusName={el.status_name} 
                  tasks={el.tasks} 
                  groupId={el.group_id} 
                />
              );
            })}
          </div>}
      </div>
    </div>
  );
}
