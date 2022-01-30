import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { url } from "../globalUrl";
import "./Login.css";
import { message } from "antd";
import admin from "../images/admin.jpg";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { Mainnet, useEtherBalance, useEthers, Config, useContractCall, useContractFunction} from '@usedapp/core'
import abi from "../smartContract/abi.json"
import { address } from "../smartContract/address"

export const AdminLoginScreen = () => {
  let navigate = useNavigate();
  const { activateBrowserWallet, account } = useEthers()
  const wethInterface = new utils.Interface(abi)
  const wethContractAddress = address
  const contract = new Contract(wethContractAddress, wethInterface)
  const { send } = useContractFunction(contract, 'isAdmin')

  function submitHandle() {
    activateBrowserWallet(onError, true).then(() => {
      send();
    }).then(() => {
      navigate("/admin-dashboard");
    });
  }

  const onError = (error: Error) => {
    console.log(error.message)
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
