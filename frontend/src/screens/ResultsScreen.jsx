import React, { useEffect, useState } from "react";
import { url } from "../globalUrl";
import { Spin } from "antd";
import { partyIcons, partyNames } from "./CandidatesScreen";
import { utils } from 'ethers';
import { Contract } from '@ethersproject/contracts'
import { useContractCall, useContractFunction } from '@usedapp/core'
import abi from "../smartContract/abi.json"
import { address } from "../smartContract/address"

export const ResultsScreen = () => {
  const wethInterface = new utils.Interface(abi)
  const wethContractAddress = address

  const [results] = useContractCall({
    abi: wethInterface,
    address: wethContractAddress,
    method: "retrieveCandidates",
    args: [],
  }) ?? [];

  return (
    <>
      <div className="candidates__ctr">
        <div className="candidates__header">
          <h1>Election results</h1>
        </div>
        <div className="candidates__body">
          <div className="candidates__cards">
            <div className="candidates__card__head">
              <div className="row_3">
                <h4>Logo</h4>
              </div>
              <div className="row_3">
                <h4>CandidateNumber</h4>
              </div>
              <div className="row_3">
                <h4>Candidate name</h4>
              </div>
              <div className="row_3" style={{ justifyContent: "center" }}>
                <h4>Number of votes</h4>
              </div>
            </div>

            {!results || results.length === 0 ? (
              <div className="spinner">
                <Spin size="large" />
              </div>
            ) : (
              <>
                {results.map((result, index) => (
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
                    <div className="row_3" style={{ justifyContent: "center" }}>
                      <h5>{parseInt(result?.[3]._hex.toString())}</h5>
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

export default ResultsScreen;
