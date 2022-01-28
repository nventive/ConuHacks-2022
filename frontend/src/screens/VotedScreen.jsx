import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import right from "../images/right.jpg";

export const VotedScreen = () => {
  let navigate = useNavigate();

  function submitHandle() {
    navigate("/");
  }

  return (
    <>
      <div className="candidates__ctr place__center">
        <div className="candidates__header top__fix">
          <h1>nventive decentralized voting system</h1>
        </div>

        <div className="_center">
          <div className="form__ctr" style={{ height: "340px" }}>
            <div className="_center">
              <img className="right" src={right} alt="logo"></img>
            </div>

            <h2>Vote Cast Successfully!</h2>
            <br />
            <Button onClick={submitHandle} type="primary">
              Exit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VotedScreen;
