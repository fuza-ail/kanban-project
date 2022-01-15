import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-container">
        <h1>Welcome to Fuza Kanban Board</h1>

        <h2>A Kanban board is an agile project management tool designed to help visualize work, limit work-in-progress and maximize efficiency (or flow). kanban boards use cards, columns and continous improvement to help technology and service teams commit to the right amount of workk, and get it done!</h2>
        
        <a href="https://www.atlassian.com/agile/kanban/boards" target="_blank" rel="noreferrer">~Resource~</a>

        <Button 
          size="large" 
          type="primary"
          onClick={()=>navigate("/login")}>
              Get Started
        </Button>
      </div>
    </div>
  );
}
