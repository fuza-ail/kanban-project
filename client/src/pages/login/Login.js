import { SnippetsFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

import AuthContainer from "../../components/authContainer/AuthContainer";

import "./Login.css";

export default function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <div className="title">
          <SnippetsFilled className="icon"/>
          <Link to="/">
            <h1>Kanban Fuza</h1>
          </Link>
        </div>
        <AuthContainer />
      </div>
    </div>
  );
}
