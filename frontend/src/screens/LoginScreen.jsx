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
import detectEthereumProvider from '@metamask/detect-provider';


function useCheckMetamask() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof web3 !== 'undefined') {
      setLoaded(true);
    }
  }, [loaded]);

  return  loaded;
}

export const LoginScreen = () => {
  const metamask = useCheckMetamask();

  const [id, setID] = useState("");
  const { activateBrowserWallet, account } = useEthers()

  let navigate = useNavigate();

  function submitHandle() {
    activateBrowserWallet(onError, true).then(() => {
      navigate("/candidates");
    });
  }

  const onError = (error: Error) => {
    console.log(error.message)

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

              {metamask && <h2 className="color1">Sign in with Metamask</h2>}
              {!metamask && <h2 className="color1">Download</h2>}
              <br />
              {metamask && <button className="color2" onClick={() => { activateBrowserWallet().then(() => {navigate("/candidates");})}} type="primary">
                <img src={deathstar} className="color3" alt="click here"  width="240" height="240" />
              </button>}
              {!metamask && <button className="color2" onClick={()=> window.open("https://metamask.io/download/", "_blank")}>
                <img src={deathstar} className="color3" alt="click here"  width="240" height="240" />
              </button>}

            </div>
          </div>
        </div>
      </>
  );
};

export default LoginScreen;