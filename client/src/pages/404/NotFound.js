import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="notFound">
      <h1>404: Page not found</h1>
      <Button onClick={()=>navigate("/")} size="large">HOME</Button>
    </div>
  );
}
