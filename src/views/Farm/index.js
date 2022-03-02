import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import { Modal } from "antd";
import { farmList, initContracts } from "../../chain/config";
import ListData from "../../components/ListData";

import explainimg from "../../assets/img/explainimg.png";
import character from "../../assets/img/farm/character.png";
import { useWallet } from "use-wallet";
import "./farm.less";
const Farm = (props) => {
  let { account } = useWallet();
  const { t } = useTranslation();
  const [isHelp, setIsHelp] = useState(false);
  const [tab] = useState([
    {
      id: 0,
      title: t("All"),
    },
    // {
    //   id: 1,
    //   title: t("Single"),
    // },
    // {
    //   id: 2,
    //   title: "LP",
    // },
  ]);
  const [activeTab, setActiveTab] = useState(tab[0].id);
  // 数据存在farmListData里面
  const [farmListData, setFarmListData] = useState(farmList);
  const [listData, setListData] = useState(farmListData);
  useEffect(() => {
    if (activeTab === 0) {
      return setListData(farmListData);
    }
    let arr = [];
    farmListData.forEach((item) => {
      if (item.type === activeTab) {
        arr.push(item);
      }
    });
    setListData(arr);
  }, [activeTab]);

  // useEffect(() => {
  //   setListData(farmListData);
  // }, [farmListData]);
  useEffect(async () => {
    if (!account) return;
    console.log("farmListData", farmListData);
    let lists = farmListData.map(async (item) => {
      //是否授权
      let allowance = await initContracts(item.lpAddress)
        .contract.methods.allowance(account, item.contractAddress)
        .call();
      item.approve = allowance;
      return item;
    });
    let arr = await Promise.all(lists);
    setFarmListData(arr);
  }, [account]);
  const showHelp = () => {
    setIsHelp(true);
    // window.open("https://www.baidu.com/");
  };
  const handleCancelHelp = () => {
    setIsHelp(false);
  };
  const handleOhHelp = () => {
    setIsHelp(false);
  };
  const setAcTab = (id) => {
    setActiveTab(id);
  };
  return (
    <div className="farm">
      {/* <Header props={props} /> */}
      <div className="top">
        <div className="top_con">
          <div className="explain">
            <p className="tit">{t("Looking_alternative")}</p>
            <p className="text">{t("Use_your_LP_tokens")}</p>
            <div className="btn" onClick={showHelp}>
              {t("Help")}
            </div>
          </div>
          {/* <div className="img">
            <img src={character} alt="" />
          </div> */}
          {/* <div className="quanyi"></div>
          <div className="quaner"></div> */}
        </div>
      </div>
      <div className="con">
        <div className="con_zhong">
          <div className="tab">
            {tab.map((item) => {
              return (
                <div
                  className={activeTab === item.id ? "active_tab" : ""}
                  key={item.id}
                  onClick={() => setAcTab(item.id)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
          <div className="list">
            {listData.map((item) => {
              return (
                <ListData
                  props={props}
                  key={item.id}
                  {...item}
                  dataI={item.id + 3}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* Help弹窗 */}
      <Modal
        title={t("Help")}
        visible={isHelp}
        onCancel={handleCancelHelp}
        centered={true}
        closable={false}
        footer={null}
        className="modal modal_help"
      >
        <div className="help_con">
          <p>Comming Soon</p>
        </div>
        <div className="operationdan">
          <div onClick={handleOhHelp}>{t("Confirm")}</div>
        </div>
      </Modal>
    </div>
  );
};
export default Farm;
