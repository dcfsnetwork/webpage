import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";

import architecture from "../../assets/img/home/techarch.png";
import dispatch from "../../assets/img/home/dis.png";
import hashra from "../../assets/img/home/hashra.png";

import "./home.less";
const Home = (props) => {
  const { t } = useTranslation();
  useEffect(() => {}, []);
  return (
    <div className="home">
      {/* <Header props={props} /> */}
      <div className="we_want">
        <span className="box cost">{t("Low_cost")}</span>
        <span className="box latency">{t("Low_latency")}</span>
        <span className="box massive">{t("Massive_Data")}</span>
        <span className="box security">{t("Privacy_security")}</span>
        <span className="box operation">{t("Operation")}</span>
        <span className="box colla">{t("Collaborative")}</span>
        <span className="box storage">{t("Big_data_storage")}</span>
        <span className="right">{t("We_want")}</span>
      </div>
      <div className="top">
        <h1>DCFS</h1>
        <p>{t("With_the_core_idea")}</p>
        <p>{t("power_infrastructure")}</p>
        <p>{t("economy_environment")}</p>
      </div>

      <div className="architecture">
        <div className="left">
          <img src={architecture} alt="" />
        </div>
        <div className="right">
          <span>{t("Technology_Architecture")}</span>
        </div>
      </div>
      <div className="dispatch">
        <div className="left">
          <img src={dispatch} alt="" />
        </div>
        <div className="right">
          <span>{t("Dispatch_center")}</span>{" "}
        </div>
      </div>
      <div className="hashrate">
        <div className="left">
          <img src={hashra} alt="" />
          {/* <div className="staking">{t("Staking")}</div>
          <div className="mining">{t("Mining")}</div> */}
        </div>
        <div className="right">
          <div className="right_text">
            <p className="title">{t("Hashrate")}</p>
            <p className="text">{t("adecentralized_blockchain")}</p>
          </div>
        </div>
      </div>
      <div className="future">{t("DCFS_FUTURE")}</div>

      {/* 球 */}
      {/* <div className="oneqiu"></div>
      <div className="twoqiu"></div>
      <div className="therrqiu"></div>
      <div className="fourqiu"></div> */}
    </div>
  );
};
export default Home;
