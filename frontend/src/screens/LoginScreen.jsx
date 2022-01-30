import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { url } from "../globalUrl";
import "./Login.css";
import nventiveLogo from "../images/nventive.jpeg";
import background from "../images/sw_background.png";
import deathstar from "../images/sw_deathstar.png";
import { message } from "antd";
import { Mainnet, useEtherBalance, useEthers, Config } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import middleware from "../middleware/Middleware";
import detectEthereumProvider from '@metamask/detect-provider';




export const LoginScreen = () => {
  const [loaded, setCount] = useState(0);
  if (window.ethereum) {
    handleEthereum();
  } else {
    window.addEventListener('ethereum#initialized', handleEthereum, { once: true, });
    setTimeout(handleEthereum, 3000);
  }
  function handleEthereum() {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      setTimeout(setCount(2),3000);
      //has metamask
    } else {//doesnt have metamask
      setCount(1);
    }
  }
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
      <div className="candidates__ctr place__center" style={{ backgroundImage: `url(${background})` }}>

        <div className="candidates__header top__fix">
          <section class="layout1">
            <div></div>
            <div>
              <img className="" src={nventiveLogo} alt="logo" width="60" height="60" ></img>
            </div>
            <div>
              <h1>nventive decentralized voting system</h1>
            </div>
            <div></div>
          </section>
        </div>

        <div className="_center">
          <div className="form__ctr" style={{ height: "400px" }}>
            
            <h2 className="color1">Sign in with Metamask</h2>
            <br />
            {loaded === 2 && <button onClick={() => { activateBrowserWallet(); middleware.setAccount(account) } } type="primary">
              
              Sign in with Metamask
            </button>}
            {loaded === 1 && <button onClick={()=> window.open("https://metamask.io/download/", "_blank")}>
        
              Download
            </button>}

          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
