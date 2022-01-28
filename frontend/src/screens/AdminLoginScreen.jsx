import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { url } from "../globalUrl";
import "./Login.css";
import { message } from "antd";
import admin from "../images/admin.jpg";

export const AdminLoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  function submitHandle() {
    const data = {
      username: username,
      password: password,
    };

    fetch(url + "/admin-login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response["status"] === 201 || response["status"] === 200) {
        message.success("Login Successfully!");
        navigate("/admin-dashboard");
        return response.json();
      } else {
        message.error("Wrong Username or Password!");
      }
    });
  }

  return (
    <>
      <div className="candidates__ctr place__center">
        <div className="candidates__header top__fix">
          <h1>Admin panel</h1>
        </div>

        <div className="_center">
          <div className="form__ctr" style={{ height: "430px" }}>
            <div className="_center">
              <img className="right" src={admin} alt="logo"></img>
            </div>
            <h2>Login</h2>

            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="large"
              placeholder="Enter your username"
              prefix={<UserOutlined />}
            />
            <br />

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="large"
              placeholder="Enter your password"
              prefix={<UserOutlined />}
            />
            <br />
            <Button onClick={submitHandle} type="primary">
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginScreen;
