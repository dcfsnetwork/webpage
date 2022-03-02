import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Statistic, Modal, Input, message } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  farmList,
  initContracts,
  address,
  TempAddress,
  globalParam,
} from "../../chain/config";
import arrow from "../../assets/img/arrow.png";
import dcc from "../../assets/img/farm/dcc.png";
import bibg from "../../assets/img/bibg.png";
import { useWallet } from "use-wallet";
import BigNumber from "bignumber.js";
import "./listdata.less";

const { Countdown } = Statistic;
const ListData = ({
  Harvests,
  props,
  title,
  myImg,
  twoImg,
  arr,
  earn,
  isHarvest,
  dccStaked,
  get,
  viewContract,
  available,
  unstake = false,
  approve,
  contractAddress,
  lpAddress,
  name,
  getLink,
  iden,
  idenIcon,
  crowd,
  subIsTime = false,
  miningPeriod = 0,
  dataI,
  total,
}) => {
  console.log("unstake123", unstake, approve);
  let { account } = useWallet();

  const { t } = useTranslation();
  const [time, setTime] = useState(0);
  // 是否授权
  const [isApprove, setIsApprove] = useState(false);
  const [isFold, setIsFold] = useState(true);
  const [isUnstake, setIsUnstake] = useState(false);
  // 减的余额
  const [subBalance, setSubBalance] = useState(0);
  // 减的输入框
  const [subVal, setSubVal] = useState("");
  const [isStake, setIsStake] = useState(false);
  // 加的余额
  const [addBalance, setAddBalance] = useState(0);

  // 加的输入框
  const [addVal, setAddVal] = useState("");
  const [isHarvestAll, setIsHarvestAll] = useState(false);
  const [dccStakedNum, setDccStakedNum] = useState(0);
  const [dccEarnedNum, setDccEarnedNum] = useState(0);
  //总质押
  const [totalStaked, setTotalStaked] = useState(0);
  // 减的另一个弹窗
  const [isUnstakeExplain, setIsUnstakeExplain] = useState(false);
  //取出收益
  const [dccEarned, setDdccEarned] = useState(0);
  const [apy, setApy] = useState(0);
  const [nowTime, setNowTime] = useState(Date.now());

  useEffect(() => {
    setInterval(() => {
      setNowTime(Date.now());
    }, 60000);
  }, []);

  useEffect(async () => {
    //apy

    console.log("get", name);
    //总质押数量 totalSupply
    let totalSupply = await initContracts(name)
      .contract.methods.totalSupply()
      .call();
    setTotalStaked(
      new BigNumber(totalSupply)
        .div(new BigNumber(10).pow(address["token"].decimal))
        .toFixed(globalParam.showDecimal)
    );
    console.log("总质押数量", totalSupply);
    if (totalSupply == 0) {
      setApy(0);
    } else {
      console.log("twoImg", twoImg, title);
      if (twoImg) {
        let dccBalance = await initContracts(TempAddress.token)
          .contract.methods.balanceOf(lpAddress)
          .call();
        let usdtBalance;
        if (title == "DUSD-DCC") {
          usdtBalance = await initContracts(TempAddress.dusd)
            .contract.methods.balanceOf(lpAddress)
            .call();
          console.log("twoImgs", title, lpAddress, usdtBalance, dccBalance);
        } else {
          usdtBalance = await initContracts(TempAddress.usdt)
            .contract.methods.balanceOf(lpAddress)
            .call();
        }

        let dccPrice = new BigNumber(1);
        if (usdtBalance != 0 && dccBalance != 0) {
          dccPrice = new BigNumber(usdtBalance)
            .div(new BigNumber(10).pow(address["usdt"].decimal))
            .div(
              new BigNumber(dccBalance).div(
                new BigNumber(10).pow(address["token"].decimal)
              )
            )
            .toFixed(globalParam.showDecimal);
        }

        let lptotalSupply = await initContracts(lpAddress)
          .contract.methods.totalSupply()
          .call();
        // console.log('价格',dccBalance,usdtBalance,dccPrice)
        // console.log('lp总',lpAddress,lptotalSupply)
        let ss = new BigNumber(total)
          .times(1e18)
          .div(7)
          .times(dccPrice)
          .times(365)
          .times(50)
          .div(new BigNumber(usdtBalance).times(2).div(lptotalSupply))
          .div(totalSupply)
          .toFixed(globalParam.showDecimal);

        // console.log('成本',usdtBalance*2/lptotalSupply,ss,total,dccPrice.toFixed(2))
        setApy(ss);
      } else {
        let rewardRate = await initContracts(name)
          .contract.methods.rewardRate()
          .call();
        let ss = new BigNumber(rewardRate)
          .times(365)
          .times(24)
          .times(60)
          .times(5000)
          .div(totalSupply)
          .toFixed(globalParam.showDecimal);
        console.log("单币", rewardRate, totalSupply);
        setApy(ss);
      }
    }
    if (!account) return;
    if (approve > 0) {
      setIsApprove(true);
    }

    //获取余额
    let balance = await initContracts(lpAddress)
      .contract.methods.balanceOf(account)
      .call();
    setAddBalance(
      new BigNumber(balance)
        .div(new BigNumber(10).pow(address["token"].decimal))
        .toFixed(globalParam.showDecimal)
    );
    //用户总质押量
    let balanceOf = await initContracts(name)
      .contract.methods.balanceOf(account)
      .call();
    setSubBalance(
      new BigNumber(balanceOf)
        .div(new BigNumber(10).pow(address["token"].decimal))
        .toFixed(globalParam.showDecimal)
    );
    setDccStakedNum(
      new BigNumber(balanceOf)
        .div(new BigNumber(10).pow(address["token"].decimal))
        .toFixed(globalParam.showDecimal)
    );
    console.log("用户质押", balanceOf);
    //用户取出收益
    let earned = await initContracts(name)
      .contract.methods.earned(account)
      .call();
    setDdccEarned(
      new BigNumber(earned)
        .div(new BigNumber(10).pow(address["token"].decimal))
        .toFixed(globalParam.showDecimal)
    );
    setDccEarnedNum(
      new BigNumber(earned)
        .div(new BigNumber(10).pow(address["token"].decimal))
        .toFixed(globalParam.showDecimal)
    );
    console.log("用户收益", earned);
    //获取倒计时
    if (available || subIsTime) {
      let userDayProfit = await initContracts(name)
        .contract.methods.userDayProfit(account)
        .call();
      setTime(userDayProfit);
    }
    //是否第三种矿池
  }, [account, approve, dataI]);
  const setFold = () => {
    setIsFold(!isFold);
  };
  const showUnstake = () => {
    setIsUnstake(true);
    setSubVal("");
  };
  const handleOkUnstake = async () => {
    console.log("取出", subVal);
    if (subVal <= 0) {
      return message.error(t("Fill_in_a_valid_number"));
    }
    let balanceOf = await initContracts(contractAddress)
      .contract.methods.balanceOf(account)
      .call();
    let num = new BigNumber(subVal).times(1e18).toFixed(0);
    if (Number(balanceOf) < Number(num)) {
      return message.error(t("Insufficient_balance"));
    }
    //取出
    await initContracts(name)
      .contract.methods.withdraw(num)
      .send({ from: globalParam.user });
    console.log("减少确定框", subVal);
    setIsUnstake(false);
  };
  const handleCancelUnstake = () => {
    setIsUnstake(false);
  };
  const subValChange = ({ target: { value } }) => {
    setSubVal(value);
  };
  const subMax = () => {
    setSubVal(subBalance);
  };

  const showStake = () => {
    setIsStake(true);
    setAddVal("");
  };
  const handleCancelStake = () => {
    setIsStake(false);
  };
  const handleOkStake = async () => {
    if (addVal <= 0) {
      return message.error(t("Fill_in_a_valid_number"));
    }
    let newdate = Date.parse(new Date()) / 1000;
    let starttime = await initContracts(name)
      .contract.methods.starttime()
      .call();
    if (Number(newdate) < Number(starttime)) {
      return message.error(t("Time_is_not_up"));
    }
    //获取余额
    let balance = await initContracts(lpAddress)
      .contract.methods.balanceOf(account)
      .call();
    let num = new BigNumber(addVal).times(1e18).toFixed(0);
    if (Number(balance) < Number(num)) {
      return message.error(t("Insufficient_balance"));
    }
    //质押
    await initContracts(name)
      .contract.methods.stake(num)
      .send({ from: globalParam.user });
    console.log("添加确定框", num, name);
    setIsStake(false);
  };
  const addValChange = ({ target: { value } }) => {
    setAddVal(value);
  };
  const addMax = () => {
    setAddVal(addBalance);
  };
  const showHarvestAll = () => {
    setIsHarvestAll(true);
  };
  const handleOkHarvestAll = async () => {
    //用户取出收益
    console.log("收割");
    if (available) {
      //判断是否满足七天取出
      let userDayProfit = await initContracts(name)
        .contract.methods.userDayProfit(account)
        .call();
      let newdate = Date.parse(new Date()) / 1000;
      if (Number(newdate) < Number(userDayProfit)) {
        return message.error(t("Time_is_not_up"));
      }
    }

    let earned = await initContracts(name)
      .contract.methods.earned(account)
      .call();
    if (Number(earned) <= 0) {
      return message.error(t("Insufficient_balance"));
    }
    //取出
    await initContracts(name)
      .contract.methods.getReward()
      .send({ from: globalParam.user });

    setDdccEarned(0);
    setDccEarnedNum(0);
    setIsHarvestAll(false);
  };
  const handleCancelHarvestAll = () => {
    setIsHarvestAll(false);
  };

  const showUnstakeExplain = () => {
    setIsUnstakeExplain(true);
  };
  const handleCancelUnstakeExplain = () => {
    setIsUnstakeExplain(false);
  };
  const handleOkUnstakeExplain = () => {
    setIsUnstakeExplain(false);
  };
  //授权
  const approveToken = async () => {
    await initContracts(lpAddress)
      .contract.methods.approve(
        contractAddress,
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
      )
      .send({
        from: account,
      });
    setIsApprove(true);
    message.success(t("Authorization_succeeded"));
  };

  console.log(time, time * 1000 < Date.now(), Date.now());
  return (
    <div className="list_item">
      <div className="tit">
        <div className="left">
          <img src={bibg} alt="" />
          {/* <img src={myImg} alt="" />
          <img src={twoImg} alt="" style={{ display: twoImg ? "" : "none" }} /> */}
        </div>
        <div className="right">
          <span>{title}</span>
          <span className="right_iden">
            {/* <img src={idenIcon} alt="" /> */}
            <span>{iden}</span>
          </span>
        </div>
        {crowd && (
          <div className="crowd">{crowd === 1 ? t("Users") : t("Leaders")}</div>
        )}
      </div>
      <div className="list_item_con">
        <div className="line">
          <span>APR:</span>
          <span>{apy}%</span>
        </div>
        <div className="line">
          <span>{t("Earn")}:</span>
          <span>{earn}</span>
        </div>
        <div className="therr_line">
          <div className="earned">
            <div className="title">{t("DCCEarned")}</div>
            <div className="num">
              <Statistic value={dccEarned} className="stat_num" />
            </div>
          </div>
          <div
            className={
              dccEarned > 0 ? "harvest_btn" : "harvest_btn harvest_btn_dis"
            }
            style={{ display: isHarvest ? "block" : "none" }}
            onClick={
              dccEarned > 0
                ? // !available
                  //   ? showHarvestAll
                  //   :
                  handleOkHarvestAll
                : null
            }
          >
            {/* {available ? (
              <span className="time_later">
                {t("Harvest")}&nbsp;
                <Countdown value={time * 1000} format="H[h]" />
                &nbsp;
                {t("Harvest_Available_days")}
              </span>
            ) : ( */}
            {t("Harvest")}
            {/* )} */}
          </div>
          <div
            className="stake"
            style={{ display: isHarvest ? "none" : "block" }}
          >
            <div className="title">{t("Dccstaked")}</div>
            <div className="num">
              <Statistic value={dccStakedNum} className="stat_num" />
            </div>
          </div>
        </div>
        <div className="four_line">
          <div className="title">
            {isHarvest ? (
              title + t("DCC_BNB_Staked")
            ) : (
              <span className="available_time">
                {t("Available_in_days")}
                &nbsp;
                <Countdown value={time * 1000} format="H[h] m[m] ss[s]" />
              </span>
            )}
          </div>
          <div className="nr">
            {isApprove ? (
              <>
                <div
                  className="num_data"
                  style={{ display: isHarvest ? "flex" : "none" }}
                >
                  <div className="num">
                    <Statistic value={subBalance} className="stat_num" />
                  </div>
                  <div className="cz">
                    {subIsTime ? (
                      <div
                        className={
                          time * 1000 <= nowTime ? "sub" : "sub sub_dis"
                        }
                        onClick={
                          time * 1000 <= nowTime
                            ? unstake
                              ? showUnstakeExplain
                              : showUnstake
                            : null
                        }
                      >
                        <div className="sub_show_time">
                          <MinusOutlined />
                          (
                          <Countdown value={time * 1000} format="H[h]" />
                          &nbsp;
                          {t("Harvest_Available_days")})
                        </div>
                      </div>
                    ) : (
                      <div
                        className="sub"
                        onClick={unstake ? showUnstakeExplain : showUnstake}
                      >
                        <MinusOutlined />
                      </div>
                    )}

                    <div className="add" onClick={showStake}>
                      <PlusOutlined />
                    </div>
                  </div>
                </div>
                <div
                  className="harvest_all"
                  style={{ display: isHarvest ? "none" : "flex" }}
                >
                  <div className="Harvest_all_btn" onClick={showHarvestAll}>
                    {t("Harvest_All")}
                  </div>
                  <div className="add" onClick={showStake}>
                    <PlusOutlined />
                  </div>
                </div>
              </>
            ) : (
              <div className="approve" onClick={approveToken}>
                {t("Approve")}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fold_box">
        <div className="fold_active">
          <div className="oper_fold" onClick={setFold}>
            <span>{isFold ? t("Hide") : t("Details")}</span>
            <img
              src={arrow}
              alt=""
              className={isFold ? "rotate" : "rotate_fan"}
            />
          </div>
          <div className={isFold ? "fold_con fold_con_active" : "fold_con"}>
            <div className="totalSta">
              <span>{t("Total_Staked")}:</span>
              <span className="num">
                <Statistic value={totalStaked} className="stat_num" />
              </span>
            </div>
            <div className="totalSta">
              <span>{t("mining_period")}:</span>
              <span className="num">
                <Statistic
                  value={miningPeriod}
                  className="stat_num"
                  suffix={t("day")}
                />
              </span>
            </div>
            <div className="get">
              <a href={getLink} target="_blank">
                {t("Get")} {get}
              </a>
            </div>
            <div className="contract">
              <a href={viewContract} target="_blank">
                {t("View_Contract")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 减的弹窗 */}
      <Modal
        title={t("Unstake") + " " + title}
        visible={isUnstake}
        onCancel={handleCancelUnstake}
        centered={true}
        closable={false}
        footer={null}
        className="modal modal_sub"
      >
        <div className="sub_con">
          <div className="one_line">
            <span>{t("Input")}</span>
            <span>
              {t("Balance")}:{subBalance}
            </span>
          </div>
          <div className="two_line">
            <Input
              placeholder="0.00"
              bordered={false}
              className="input"
              type="number"
              value={subVal}
              onChange={subValChange}
            />
            <div className="max">
              <span onClick={subMax}>MAX</span>
            </div>
            <div className="curr_name">{title}</div>
          </div>
        </div>
        <div className="operation">
          <div onClick={handleCancelUnstake}>{t("Cancel")}</div>
          <div onClick={handleOkUnstake}>{t("Confirm")}</div>
        </div>
      </Modal>
      {/* 减的带说明的弹窗 */}
      <Modal
        title={t("Unstake")}
        visible={isUnstakeExplain}
        onCancel={handleCancelUnstakeExplain}
        centered={true}
        closable={false}
        footer={null}
        className="modal modal_unstake"
      >
        <p>{t("your_principal_will")}</p>
        <div className="unstake">
          <div className="box">
            <img src={dcc} alt="" />
            <div className="num">
              <Statistic value={dccStakedNum} className="stat_num" />
            </div>
            <div className="title">DCC&nbsp;{t("Staked")}</div>
          </div>
          <div className="box">
            <img src={dcc} alt="" />
            <div className="num">
              <Statistic value={dccEarnedNum} className="stat_num" />
            </div>
            <div className="title">WDCC&nbsp;{t("Earned")} 第三</div>
          </div>
        </div>
        <div className="operation">
          <div onClick={handleCancelUnstakeExplain}>{t("Cancel")}</div>
          <div onClick={handleOkUnstakeExplain}>{t("Confirm")}</div>
        </div>
      </Modal>

      {/* 加的弹窗 */}
      <Modal
        title={t("Stake") + " " + title}
        visible={isStake}
        onCancel={handleCancelStake}
        centered={true}
        closable={false}
        footer={null}
        className="modal modal_add"
      >
        <div className="add_con">
          <div className="one_line">
            <span>{t("Input")}</span>
            <span>
              {t("Balance")}:{addBalance}
            </span>
          </div>
          <div className="two_line">
            <Input
              placeholder="0.00"
              bordered={false}
              className="input"
              type="number"
              value={addVal}
              onChange={addValChange}
            />
            <div className="max">
              <span onClick={addMax}>MAX</span>
            </div>
            <div className="curr_name">{title}</div>
          </div>
        </div>
        <div className="operation">
          <div onClick={handleCancelStake}>{t("Cancel")}</div>
          <div onClick={handleOkStake}>{t("Confirm")}</div>
        </div>
      </Modal>

      {/* Harvest All的弹窗 */}
      <Modal
        title={t("Harvest_All")}
        visible={isHarvestAll}
        onCancel={handleCancelHarvestAll}
        centered={true}
        closable={false}
        footer={null}
        className="modal modal_harvest"
      >
        <p>{t("You_will_receive")}</p>
        <div className="harvest_con">
          <div className="box">
            <img src={dcc} alt="" />
            <div className="num">
              <Statistic value={dccStakedNum} className="stat_num" />
            </div>
            <div className="title">DCC&nbsp;{t("Staked")}</div>
          </div>
          <div className="box">
            <img src={dcc} alt="" />
            <div className="num">
              <Statistic value={dccEarnedNum} className="stat_num" />
            </div>
            <div className="title">DCC&nbsp;{t("Earned")}</div>
          </div>
        </div>
        <div className="operation">
          <div onClick={handleCancelHarvestAll}>{t("Cancel")}</div>
          <div onClick={handleOkHarvestAll}>{t("Confirm")}</div>
        </div>
      </Modal>
    </div>
  );
};
export default ListData;
