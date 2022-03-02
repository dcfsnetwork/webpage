import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { message, Modal, Statistic, Drawer } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { GlobalOutlined } from "@ant-design/icons";
import { AppConfig } from "../../config";
import {
  address,
  globalParam,
  initContracts,
  TempAddress,
} from "../../chain/config";
import logo from "../../assets/img/logo.png";
import matemask from "../../assets/img/matemask.png";
import copy from "../../assets/img/copy.png";
import comfarmicon from "../../assets/img/comfarmicon.png";
import comfarmiconac from "../../assets/img/comfarmiconac.png";
import farmicon from "../../assets/img/farmicon.png";
import farmiconac from "../../assets/img/farmiconac.png";
import homeicon from "../../assets/img/homeicon.png";
import homeiconac from "../../assets/img/homeiconac.png";
import { useWallet } from "use-wallet";
import listicon from "../../assets/img/listicon.png";
import downarrow from "../../assets/img/downarrow.png";
import bnb from "../../assets/img/farm/bnb.png";
import dcc from "../../assets/img/farm/dcc.png";
import logom from "../../assets/img/logom.png";

import "./header.less";
import BigNumber from "bignumber.js";
const Header = ({ props }) => {
  const { t } = useTranslation();
  const [menu] = useState([
    {
      key: "/",
      title: t("Home"),
      icon: homeicon,
      iconAc: homeiconac,
    },
    {
      key: "/farm",
      title: t("Farm"),
      icon: farmicon,
      iconAc: farmiconac,
    },
    {
      key: "/communityfarm",
      title: t("Communityfarm"),
      icon: comfarmicon,
      iconAc: comfarmiconac,
    },
  ]);
  // 链
  const chain = [
    {
      id: 0,
      name: "BSC",
      link: "http://dcfs.finance/",
      logo: bnb,
    },
    {
      id: 1,
      name: "DCFS",
      link: "http://dcc.dcfs.finance/",
      logo: dcc,
    },
  ];
  // // 选中的链
  // const [chainActive, setChainActive] = useState(0);
  // // 选中的链的名字
  // const [chainName, setChainName] = useState(chain[0].name);
  // 是否显示选中链的弹窗
  const [isShowChain, setIsShowChain] = useState(false);
  const [lang, setLang] = useState([
    {
      id: 0,
      key: "cn",
      title: "中文繁體(CN)",
    },
    {
      id: 1,
      key: "en",
      title: "English(EN)",
    },
  ]);
  let { status, connect, account: addressdz, balance, chainId } = useWallet();
  console.log("UseWalletProvider", chainId);
  const [isLang, setIsLang] = useState(false);
  const [activeLang, setActiveLang] = useState(
    localStorage.getItem("lang") || "en"
  );
  const [viewBsc, setViewBsc] = useState("https://www.dcfsscan.io/address/");
  const [isShowLang, setIsShowLang] = useState(false);
  const [activeMenu, setActiveMenu] = useState(props.location.pathname);
  const [isWallet, setIsWallet] = useState(false);
  // 是否连接了钱包
  const [isConnectWallet, setIsConnectWallet] = useState(false);
  const [isMyaccount, setIsMyaccount] = useState(false);
  // 钱包地址
  const [walletaddress, setWalletaddress] = useState();
  // Bnb balance
  const [bnbBalance, setBnbBalance] = useState(0);
  // dcc balance
  const [dccBalance, setDccBalance] = useState(0);
  // 是否是移动端
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const setSwitchChain = () => {
    setIsShowChain(!isShowChain);
  };
  useEffect(() => {
    document.onclick = () => {
      setIsLang(false);
      setIsShowChain(false);
    };
    let width = document.body.clientWidth;
    if (width <= 767) {
      setIsMobile(true);
    }
  }, []);

  useEffect(async () => {
    if (status === "connected") {
      AppConfig.addr = addressdz;
      globalParam.user = addressdz;
      setIsConnectWallet(true);
      setWalletaddress(addressdz);
    }
  }, [status, addressdz]);
  useEffect(() => {
    connect("injected");
  }, []);
  useEffect(async () => {
    if (!addressdz) return;

    //获取余额
    let balance = await initContracts(TempAddress.token)
      .contract.methods.balanceOf(addressdz)
      .call();
    setDccBalance(
      new BigNumber(balance)
        .div(new BigNumber(10).pow(address["token"].decimal))
        .toFixed(globalParam.showDecimal)
    );
    setViewBsc(viewBsc + addressdz);
  }, [addressdz]);
  const setDrawerLang = () => {
    setIsShowLang(true);
    setVisible(false);
  };
  const handleCancelDrawerLang = () => {
    setIsShowLang(false);
  };
  const onNoGuan = (e) => {
    window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
  };
  const setLanguage = (val) => {
    setActiveLang(val);
    localStorage.setItem("lang", val);
    setIsShowLang(false);
    window.location.reload();
  };
  const setLink = (key) => {
    props.history.push(key);
    setActiveMenu(key);
    setVisible(false);
  };
  const showWallet = () => {
    setIsWallet(true);
    setVisible(false);
  };
  const isShowClick = () => {
    setIsLang(!isLang);
    onNoGuan();
  };
  const handleCancelWallet = () => {
    setIsWallet(false);
  };
  // 链接钱包
  const linkWallet = () => {
    console.log("链接钱包");
    setIsWallet(false);
  };
  const showMyaccount = () => {
    setIsMyaccount(true);
    setVisible(false);
  };
  const handleCancelMyaccount = () => {
    setIsMyaccount(false);
  };
  const handleOkMyaccount = () => {
    setIsMyaccount(false);
  };
  const onCoptOk = () => {
    message.success(t("Copy_succeeded"));
  };
  const goLink = (link) => {
    window.location.href = link;
  };
  return (
    <div className="header">
      {isMobile ? (
        ""
      ) : (
        <div className="header_left">
          <div className="logo">
            <img src={logo} alt="" />
            <span>DCC</span>
          </div>
          <div className="menu">
            {menu.map((item, i) => {
              return (
                <div
                  className={
                    activeMenu === item.key
                      ? "menu_item menu_item_active"
                      : "menu_item"
                  }
                  key={i}
                  onClick={() => setLink(item.key)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="header_right">
        {isMobile ? (
          <span className="icon" onClick={showDrawer}>
            <img src={listicon} alt="" />
          </span>
        ) : (
          <>
            <div className="get">
              <a
                href="https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059ff775485246999027b3197955&outputCurrency=0x98779fac3d808bbe07e137322454980804745bef"
                target="_blank"
              >
                {t("Get")}&nbsp;DCC
              </a>
            </div>
            <div className="switch_chain" onClick={onNoGuan}>
              <div onClick={setSwitchChain} className="can">
                <span>DCFS</span>
                <img src={downarrow} alt="" className="downarr" />
              </div>

              <div
                className="chain_list"
                style={{ display: isShowChain ? "block" : "none" }}
              >
                <div className="network">{t("Select_network")}</div>
                {chain.map((item, i) => {
                  return (
                    <div
                      className="chain_item"
                      key={i}
                      onClick={() => goLink(item.link)}
                    >
                      <img src={item.logo} alt="" />
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>
            {isConnectWallet ? (
              <div className="connect_wallet" onClick={showMyaccount}>
                {t("My_account")}
              </div>
            ) : (
              <div className="connect_wallet" onClick={showWallet}>
                {t("Connect_Wallet")}
              </div>
            )}
          </>
        )}
        {isMobile ? (
          ""
        ) : (
          <span className="lang">
            <GlobalOutlined onClick={isShowClick} />
            <div
              className="lang_list"
              style={{ display: isLang ? "block" : "none" }}
            >
              {lang.map((item) => {
                return (
                  <div
                    className={
                      item.key === activeLang
                        ? "lang_item lang_item_active "
                        : "lang_item"
                    }
                    onClick={() => {
                      setLanguage(item.key);
                    }}
                    key={item.id}
                  >
                    <span className="lang_title">{item.title}</span>
                    <span className="circle">
                      <span className="circle_nei"></span>
                    </span>
                  </div>
                );
              })}
            </div>
          </span>
        )}
      </div>

      {/* 链接钱包弹窗 */}
      <Modal
        visible={isWallet}
        onCancel={handleCancelWallet}
        centered={true}
        closable={false}
        footer={null}
        className="modal modal_matemask"
      >
        <div className="matemask_con">
          <div className="matemask" onClick={linkWallet}>
            <img src={matemask} alt="" />
            <div className="text">Matemask</div>
          </div>
        </div>

        {/* <div className="operation">
          <div>{t("Cancel")}</div>
          <div>{t("Confirm")}</div>
        </div>
        <div className="operationdan">
          <div>{t("Confirm")}</div>
        </div> */}
      </Modal>
      {/* 连接钱包之后的弹窗 */}
      <Modal
        title={t("Your_Wallet")}
        visible={isMyaccount}
        onCancel={handleCancelMyaccount}
        centered={true}
        closable={false}
        footer={null}
        className="modal your_wallet"
      >
        <div className="your_wallet_con">
          <div className="one_line">{t("Your_address")}</div>
          <div className="two_line">
            <span>{walletaddress}</span>
            <span>
              <CopyToClipboard text={walletaddress} onCopy={onCoptOk}>
                <img src={copy} alt="" />
              </CopyToClipboard>
            </span>
          </div>
          {/*<div className="therr_line">*/}
          {/*  <span>{t("Bnb_balance")}</span>*/}
          {/*  <span>*/}
          {/*    <Statistic value={bnbBalance} className="stat_num" />*/}
          {/*  </span>*/}
          {/*</div>*/}
          <div className="four_line">
            <span>{t("dcc_balance")}</span>
            <span>
              <Statistic value={dccBalance} className="stat_num" />
            </span>
          </div>
          <div className="five_line">
            <span>
              <a href={viewBsc} target="_blank">
                {t("View_On_Bscscan")}
              </a>
            </span>
          </div>
        </div>
        {/* <div className="operationdan">
          <div onClick={handleOkMyaccount}>{t("Disconnect_Wallet")}</div>
        </div> */}
      </Modal>

      {/* 移动端右侧框 */}
      <Drawer
        placement="left"
        onClose={onClose}
        visible={visible}
        closable={false}
        width={"60%"}
        className="drawer_ment"
      >
        <div className="logo">
          <img src={logom} alt="" />
          <span>DCC</span>
        </div>
        <div className="menu">
          {menu.map((item, i) => {
            return (
              <div
                className={
                  activeMenu === item.key
                    ? "menu_item menu_item_active"
                    : "menu_item"
                }
                key={i}
                onClick={() => setLink(item.key)}
              >
                <img
                  src={activeMenu === item.key ? item.iconAc : item.icon}
                  alt=""
                  className="icon"
                />
                {item.title}
              </div>
            );
          })}
        </div>
        {/* <div className="line"></div> */}
        <div className="get">
          <a href="https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059ff775485246999027b3197955&outputCurrency=0x98779fac3d808bbe07e137322454980804745bef">
            {t("Get")}&nbsp;DCC
          </a>
        </div>
        <div className="switch_chain" onClick={onNoGuan}>
          <div className="car" onClick={setSwitchChain}>
            <span>DCFS</span>
            <img src={downarrow} alt="" className="downarr" />
          </div>
          <div
            className="chain_list"
            style={{ display: isShowChain ? "block" : "none" }}
          >
            <div className="network">{t("Select_network")}</div>
            {chain.map((item, i) => {
              return (
                <div
                  className="chain_item"
                  key={i}
                  onClick={() => goLink(item.link)}
                >
                  <img src={item.logo} alt="" />
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="lang">
          <GlobalOutlined onClick={setDrawerLang} />
        </div>

        {isConnectWallet ? (
          <div className="connect_wallet" onClick={showMyaccount}>
            {t("My_account")}
          </div>
        ) : (
          <div className="connect_wallet" onClick={showWallet}>
            {t("Connect_Wallet")}
          </div>
        )}
      </Drawer>

      {/* 移动端语言选择 */}
      <Modal
        visible={isShowLang}
        onCancel={handleCancelDrawerLang}
        centered={true}
        closable={false}
        footer={null}
        className="modal modal_drawerlang"
      >
        {lang.map((item) => {
          return (
            <div
              className={activeLang === item.key ? "item item_active" : "item"}
              key={item.id}
              onClick={() => {
                setLanguage(item.key);
              }}
            >
              <div className="title">{item.title}</div>
              <span className="quan">
                <span className="quan_nei"></span>
              </span>
            </div>
          );
        })}
      </Modal>
    </div>
  );
};
export default Header;
