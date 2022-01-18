import React, { useState } from "react";
import { Input, Button, Avatar, Tooltip, message } from "antd";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./BoardHeader.css";
import axios from "axios";
import { baseUrl } from "../../constants/url";
import { AddMember } from "../../store/action/groupAction";

export default function BoardHeader(props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading]= useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("access-token");

  function back() {
    navigate("/dashboard");
  }

  function addMoreMember() {
    setLoading(true);
    axios({
      method: "post",
      url: `${baseUrl}/members`,
      data: {
        email,
        boardId: props.boardId
      },
      headers: {
        access_token: accessToken
      }
    }).then(res=>{
      const { data } = res.data;
      setLoading(false);
      dispatch(AddMember({
        member: data,
      }));
    }).catch(err=>{
      const { data } = err.response;
      setLoading(false);
      message.error(data.message);
    });
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <div className="boardHeader">
      <div className="boardHeader-invite">
        <Button onClick={back} icon={<ArrowLeftOutlined />} shape="circle" className="back"/>
        <Input placeholder="Email" onChange={handleEmail} />
        <Button type="primary" onClick={addMoreMember} loading={loading}>Invite</Button>
      </div>

      <div className='boardHeader-member'>
        {props.isLoading?
          <h3>Loading...</h3>:
          <Avatar.Group>
            {props.members.map((el, idx)=>{
              return (
                <Tooltip key={idx} title={el.email} placement="top">
                  <Avatar
                    style={{
                      backgroundColor: "#86939E",
                    }}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
              );
            })}
          </Avatar.Group>}
      </div>
    </div>
  );
}
