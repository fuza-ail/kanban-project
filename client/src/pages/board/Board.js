import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import BoardHeader from "../../components/boardHeader/BoardHeader";

import { getGroups } from "../../store/action/groupAction";

import "./Board.css";

export default function Board() {
  const param = useParams();
  const title = useLocation().state;
  const { groups, members, isLoading, isError } = useSelector((state)=>state.groupReducer);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getGroups(Number(param.boardId)));
    // console.log(groups, members);
  }, []);

  if (isError) {
    return <h4>Error: something went wrong</h4>;
  }

  return (
    <div className="board">
      <div className="board-container">
        <h1>{title.toUpperCase()} BOARD</h1>
        <BoardHeader isLoading={isLoading} members={members} boardId={param.boardId}/>
        <hr />
      </div>
    </div>
  );
}
