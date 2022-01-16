import React from "react";

import BoardCard from "../../components/boardCard/BoardCard";
import AddBoardModal from "../../components/addBoardForm/AddBoardModal";
import Logout from "../../components/logout/Logout";

import "./Dashboard.css";

export default function Dashboard() {
  const data = [
    {
      title: "Project pertama",
      description: "project percobaan",
      date: new Date().toISOString()
    },
    {
      title: "project kedua",
      description: "project percobaan",
      date: new Date().toISOString()
    },
  ];

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
            data.map((el, idx)=>{
              return (
                <BoardCard 
                  key={idx} 
                  title={el.title}
                  description={el.description}
                  date={el.date}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
