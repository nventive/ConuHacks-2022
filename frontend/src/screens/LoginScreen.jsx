import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { url } from "../globalUrl";
import "./Login.css";
import nventiveLogo from "../images/nventive.jpeg";
import { message } from "antd";
import { Mainnet, useEtherBalance, useEthers, Config } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import middleware from "../middleware/Middleware";
import detectEthereumProvider from '@metamask/detect-provider';

if (window.ethereum) {
   handleEthereum(); 
  } else { 
    window.addEventListener('ethereum#initialized', handleEthereum, { once: true, }); 
    setTimeout(handleEthereum, 3000);}
    function handleEthereum(){
      const{ethereum}=window;
      if(ethereum && ethereum.isMetaMask){
//has metamask
      } else {
        //doesn't have metamask
      }
    }
export const LoginScreen = () => {
  const [id, setID] = useState("");
  const { activateBrowserWallet, account } = useEthers()

  let navigate = useNavigate();

  function submitHandle() {
    fetch(url + "/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        console.log(response);
        if (response["status"] === 201 || response["status"] === 200) {
          message.success("Logged in successfully!");
          return response.json();
        } else if (response["status"] === 401) {
          message.error("You already voted!");
        } else {
          message.error("The election is closed!");
        }
      })
      .then((result) => {
        if (result !== undefined) {
          navigate("/candidates", { state: { id: result } });
        }
      });
  }

  return (
    <>
      <div className="candidates__ctr place__center">
        <div className="candidates__header top__fix">
          <h1>nventive decentralized voting system</h1>
        </div>

        <div className="_center">
          <div className="form__ctr" style={{ height: "370px" }}>
            <div className="_center">
              <img className="right" src={nventiveLogo} alt="logo"></img>
            </div>
            <h2>Login</h2>

            <Input
              type="number"
              value={id}
              onChange={(e) => setID(e.target.value)}
              size="large"
              placeholder="Enter your identification number"
              prefix={<UserOutlined />}
            />
            <br />
            <Button onClick={() => { activateBrowserWallet(); middleware.setAccount(account) }} type="primary">
              Sign in with Metamask
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
