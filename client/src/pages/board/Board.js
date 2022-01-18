import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button, Input, message } from "antd";

import BoardHeader from "../../components/boardHeader/BoardHeader";
import GroupContainer from "../../components/groupContainer/GroupContainer";

import { AddGroup, getGroups } from "../../store/action/groupAction";

import "./Board.css";
import axios from "axios";
import { baseUrl } from "../../constants/url";

export default function Board() {
  const [statusName, setStatusName] = useState("");
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const title = useLocation().state;
  const { groups, members, isLoading, isError } = useSelector((state)=>state.groupReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("access-token");

  useEffect(()=>{
    dispatch(getGroups(Number(param.boardId)));
  }, [dispatch, param.boardId]);

  function refresh() {
    navigate("/dashboard");
    window.location.reload();
  }

  function addGroup() {
    if (!statusName) {
      message.warning("Please insert the title group");
      return;
    }
    
    axios({
      url: `${baseUrl}/groups`,
      method: "post",
      headers: {
        access_token: accessToken
      },
      data: {
        board_id: param.boardId,
        status_name: statusName,
        color: "black"
      }
    }).then(res=>{
      setStatusName("");
      setLoading(false);
      const { data } = res.data;
      
      dispatch(AddGroup({
        group: {
          board_id: data.board_id,
          group_id: data.id,
          status_name: data.status_name,
          color: data.color,
          created_at: data.created_at,
          updated_at: data.updated_at,
          tasks: []
        }
      }));
    }).catch(err=>{
      setStatusName("");
      setLoading(false);
      const { data } = err.response;
      message.error(data.message);
    });
  }

  if (isError) {
    return <h3 style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem"
    }}>Error: something went wrong &nbsp;<span style={{ cursor: "pointer", color: "blue" }} onClick={refresh}>Refresh</span></h3>;
  }

  return (
    <div className="board">
      <div className="board-container">
        <div className="head">
          <h1>{title.toUpperCase()} BOARD</h1>
          <div className="head-add">
            <Input 
              placeholder='Title group' 
              value={statusName}
              onChange={(e)=>setStatusName(e.target.value)}/>
            <Button onClick={addGroup} loading={loading}>Add</Button>
          </div>
        </div>
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
