import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { url } from "../globalUrl";
import { message } from "antd";
import "./AdminDashboard.css";
import logoutIcon from "../images/logout.png";
import stop from "../images/stop.png";
import result from "../images/result.png";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { Mainnet, useEtherBalance, useEthers, Config, useContractCall, useContractFunction} from '@usedapp/core'
import abi from "../smartContract/abi.json"
import { address } from "../smartContract/address"

export const AdminDashboardScreen = () => {
  let navigate = useNavigate();
  const wethInterface = new utils.Interface(abi)
  const wethContractAddress = address
  const contract = new Contract(wethContractAddress, wethInterface)
  const { send } = useContractFunction(contract, 'endElection')

  function logout() {
    navigate("/");
  }

  function endHandle() {
    send();

    // fetch(url + "/end", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json, text/plain",
    //     "Content-Type": "application/json;charset=UTF-8",
    //   },
    // }).then((response) => {
    //   if (response["status"] === 201 || response["status"] === 200) {
    //     message.success("Election Ended!");
    //     return response.json();
    //   } else {
    //     message.error("Something went wrong!");
    //   }
    // });
  }

  function viewResults() {
    navigate("/results");
  }

  return (
    <>
      <div className="candidates__ctr ">
        <div className="candidates__header top__fix">
          <h1>Admin panel</h1>
        </div>

        <div className="center_row">
          <div className="dashboard_card">
            <div className="_center">
              <img className="right" src={result} alt="logo"></img>
            </div>
            <h2>Results</h2>
            <br />
            <Button onClick={viewResults} type="primary">
              Show
            </Button>
          </div>
          <div className="dashboard_card">
            <div className="_center">
              <img className="right" src={stop} alt="logo"></img>
            </div>
            <h2>Close the election</h2>
            <br />
            <Button onClick={endHandle} type="primary">
              Close
            </Button>
          </div>
          <div className="dashboard_card">
            <div className="_center">
              <img className="right" src={logoutIcon} alt="logo"></img>
            </div>
            <h2>Logout</h2>
            <br />
            <Button onClick={logout} type="primary">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardScreen;
