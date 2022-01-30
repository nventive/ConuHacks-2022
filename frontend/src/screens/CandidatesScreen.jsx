import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Candidates.css";
import empireIcon from "../images/empire.jpg";
import republicIcon from "../images/republic.png";
import "antd/dist/antd.css";
import { Popconfirm, message } from "antd";
import { url } from "../globalUrl";
import { Spin } from "antd";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractCall, useContractFunction } from '@usedapp/core'
import abi from "../smartContract/abi.json"
import { address } from "../smartContract/address"

export const partyIcons = {
  empire: empireIcon,
  republic: republicIcon,
};

export const partyNames = {
  empire: "Galactic Empire",
  republic: "New Republic",
};

export const CandidatesScreen = () => {
  const navigate = useNavigate();

  const wethInterface = new utils.Interface(abi)
  const wethContractAddress = address
  const contract = new Contract(wethContractAddress, wethInterface)

  const [candidates] = useContractCall({
    abi: wethInterface,
    address: wethContractAddress,
    method: "retrieveCandidates",
    args: [],
  }) ?? [];

  const { send } = useContractFunction(contract, 'vote')

  function confirm(can_id) {
    try {
      send(can_id + 1).then(() => {navigate("/Voted")});
    } catch (e) {
      message.error("Already Voted!");
      navigate("/");
    }
  }

  function cancel(e) {
    console.log(e);
    message.error("Cancelled by User");
  }

  return (
    <>
      <div className="candidates__ctr">
        <div className="candidates__header">
          <h1>Candidate List</h1>
        </div>
        <div className="candidates__body">
          <div className="candidates__cards">
            <div className="candidates__card__head">
              <div className="row_3">
                <h4>Logo</h4>
              </div>
              <div className="row_3">
                <h4>Candidate number</h4>
              </div>
              <div className="row_3">
                <h4>Candidate name</h4>
              </div>
              <div
                className="row_3"
                style={{ justifyContent: "flex-end" }}
              ></div>
            </div>
            {!candidates || candidates.length === 0 ? (
              <div className="spinner">
                <Spin size="large" />
              </div>
            ) : (
              <>
                {candidates.map((result, index) => (
                  <div className="candidates__card" key={index}>
                    <div className="row_3">
                      <img
                        className="party__icon"
                        src={partyIcons[result?.[2]]}
                        alt="logo"
                      ></img>
                    </div>

                    <div className="row_3">
                      <h5>{result?.[1]}</h5>
                    </div>
                    <div className="row_3">
                      <h5>{partyNames[result?.[2]]}</h5>
                    </div>
                    <div
                      className="row_3"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <Popconfirm
                        title="Are you sure to vote this candidate?"
                        onConfirm={() => confirm(index)}
                        onCancel={()=> {console.log(index);cancel()}}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                      >
                        <button className="btn btn-primary">VOTE</button>
                      </Popconfirm>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidatesScreen;
