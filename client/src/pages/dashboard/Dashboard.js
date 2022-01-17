import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import BoardCard from "../../components/boardCard/BoardCard";
import AddBoardModal from "../../components/addBoardForm/AddBoardModal";
import Logout from "../../components/logout/Logout";

import "./Dashboard.css";
import { getBoards } from "../../store/action/boardAction";

export default function Dashboard() {
  const { boards, isLoading, isError } = useSelector((state)=>state.boardReducer);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getBoards());
  }, [dispatch]);

  function refresh() {
    window.location.reload();
  }

  if (isError) {
    return <h3>Error: something went wrong &nbsp;<span style={{ cursor: "pointer", color: "blue" }} onClick={refresh}>Refresh</span></h3>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="header">
          <div className="header-title">
            <h2>Your Boards</h2>
            <AddBoardModal/>
          </div>

          <Logout />
        </div>

        <hr />

        <div className='content'>
          {
            isLoading? 
              <h3>Loading...</h3>:
              boards.length === 0?
                <h3>You have no board</h3>:
                boards.map((el, idx)=>{
                  return (
                    <BoardCard 
                      key={idx} 
                      id={el.board_id}
                      title={el.name}
                      description={el.description}
                      date={el.created_at}
                      userId= {el.user_id}
                      ownerId = {el.owner_id} 
                    />
                  );
                })
          }
        </div>
      </div>
    </div>
  );
}
