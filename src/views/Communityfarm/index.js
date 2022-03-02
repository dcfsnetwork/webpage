import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import { Modal } from "antd";
import { communityFarmList, initContracts } from "../../chain/config";
import ListData from "../../components/ListData";

import explainimg from "../../assets/img/explainimg.png";
import exp from "../../assets/img/communityfarm/exp.png";

import "./communityfarm.less";
import { useWallet } from "use-wallet";
const Communityfarm = (props) => {
  let { account } = useWallet();
  const { t } = useTranslation();
  const [isHelp, setIsHelp] = useState(false);
  const [cfList, setCFList] = useState(communityFarmList);
  const [listData, setListData] = useState(cfList);
  const [tabList, setTabList] = useState([
    { id: 0, title: t("All") },
    { id: 1, title: t("Single") },
    { id: 2, title: "LP" },
  ]);

  // 选中的tab
  const [acTab, setAcTab] = useState(0);

  useEffect(async () => {
    if (!account) return;
    let lists = communityFarmList.map(async (item) => {
      //是否授权
      let allowance = await initContracts(item.lpAddress)
        .contract.methods.allowance(account, item.contractAddress)
        .call();
      item.approve = allowance;
      return item;
    });
    let arr = await Promise.all(lists);
    setCFList(arr);
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
  const tabClick = (id) => {
    setAcTab(id);
    if (id === 0) {
      setListData(cfList);
    } else if (id === 1) {
      let narr = [];
      narr = cfList.filter((item) => item.type === 1);
      setListData(narr);
    } else if (id === 2) {
      let narr = [];
      narr = cfList.filter((item) => item.type === 2);
      setListData(narr);
    }
  };
  return (
    <div className="communityfarm">
      {/* <Header props={props} /> */}
      <div className="top">
        <div className="top_con">
          <div className="explain">
            <p className="tit">{t("Looking_communityfarm")}</p>
            <p className="text">{t("Looking_communityfarm_Use_your_LP")}</p>
            <div className="btn" onClick={showHelp}>
              {t("Help")}
            </div>
          </div>
          {/* <div className="img">
            <img src={exp} alt="" />
          </div> */}
        </div>
      </div>

      <div className="con">
        <div className="tab">
          {tabList.map((item) => {
            return (
              <div
                key={item.id}
                className={acTab === item.id ? "active_tab" : ""}
                onClick={() => tabClick(item.id)}
              >
                {item.title}
              </div>
            );
          })}
        </div>
        <div className="list">
          {listData.map((item, i) => {
            return <ListData props={props} key={i} {...item} dataI={item.id} />;
          })}
        </div>
        {/*/!* 蒙层 *!/*/}
        {/*<div className="mantle">Comming Soon</div>*/}
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
export default Communityfarm;
