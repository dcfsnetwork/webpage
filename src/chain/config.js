import token_abi from "./json/token.json";
import pool_abi from "./json/pool.json";
import Web3 from "web3";

import bnb from "../assets/img/farm/bnb.png";
import dcc from "../assets/img/farm/dcc.png";
import usdt from "../assets/img/farm/usdt.png";
import single from "../assets/img/single.png";
import manypeople from "../assets/img/manypeople.png";

export let globalParam = {
  user: "",
  showDecimal: 4,
  gasM: 200000,
};
let tokenAddr = "0xf7d735a40Ff5560344C05640FaD479bE45d1cbea"; //wdcc代币合约地址  0xAB7fb6DE365b7b575A6cD47e95677af5083f7dED
let usdtAddr = "0x19bf64eef4cf393c56739137ba1a6b1eeb26eceb"; //usdt代币  0x84Ff1AFD7d1caB08b97e627A98ecCE8572e35A34
let lpTokenUsdtAddr = "0x8855c2b95275cC44bEC89B9168dc2fE626AB3dE9"; //DUSD-USDT LP矿池
let lpdusdDccAddr = "0x605B1d82ff357Bd7dc3c4c884797f5D816C2D414"; //DUSD-DCC lp
let dusd = '0xab9014e94dc999ee0e16a224247b9b1339c5940d'
let DUSDUsdtPoolAddr = "0x9DAbdd5E15F724448036fB0c0A6155fda97B899b"; //DUSD-USDT LP矿池 挖矿  0x775a6a45d40990C1Cf2F077672B27af54c1b29bE
let tokenUsdtDayPoolAddr = "0xaa52F6F8a3Db8c027aADC2D5767b0B590e8C2973"; // DUSD-DCC LP矿池 挖矿 锁仓60
let tokenUsdtDayTwoPoolAddr = "0x12Bf8284421b5c86Df2dfEC09E60eaFF87823ca6"; // DUSD-DCC LP矿池 挖矿 锁仓180

let tokenThreePoolAddr = "0x6aCd2DE0E6Cf45185a3182bECbd4C0076c1c451f"; //单币 锁仓60
let tokenThreeLeadersPoolAddr = "0x2687BF3FcFFf78A22653199CA2c21B05a4cB1551"; //单币 锁仓180

let lpDccUsdtThreeOnePoolAddr = "0x55DFab0e45E8c51FE08a1eDB626bdd35809cd807"; //第三种矿池lp1 dcc-usdt
let lpDccUsdtThreeTwoPoolAddr = "0x55DFab0e45E8c51FE08a1eDB626bdd35809cd807"; //第三种矿池lp2 dcc-usdt
export const TempAddress = {
  token: tokenAddr,
  usdt: usdtAddr,
  lpTokenUsdt: lpTokenUsdtAddr,
  lpdusdDcc: lpdusdDccAddr,
  dusd:dusd,
  DUSDUsdtPool: DUSDUsdtPoolAddr,
  tokenUsdtDayPool: tokenUsdtDayPoolAddr,
  tokenUsdtDayTwoPool: tokenUsdtDayTwoPoolAddr,

  tokenThreePool: tokenThreePoolAddr,
  tokenThreeLeadersPool: tokenThreeLeadersPoolAddr,
  lpDccUsdtThreeOnePool: lpDccUsdtThreeOnePoolAddr,
  lpDccUsdtThreeTwoPool: lpDccUsdtThreeTwoPoolAddr,
};

export const address = {
  token: {
    address: tokenAddr,
    decimal: 18,
  },
  dusd: {
    address: dusd,
    decimal: 18,
  },

  usdt: {
    address: usdtAddr,
    decimal: 18,
  },
  lpTokenUsdt: {
    address: lpTokenUsdtAddr,
    decimal: 18,
  },
  DUSDUsdtPool: TempAddress.DUSDUsdtPool,
  tokenUsdtDayPool: TempAddress.tokenUsdtDayPool,
  tokenThreePool: TempAddress.tokenThreePool,
  tokenUsdtDayTwoPool: TempAddress.tokenUsdtDayTwoPool,
  tokenThreeLeadersPool: TempAddress.tokenThreeLeadersPool,
  lpDccUsdtThreeOnePool: TempAddress.lpDccUsdtThreeOnePool,
  lpDccUsdtThreeTwoPool: TempAddress.lpDccUsdtThreeTwoPool,
};
//
export const initContracts = (coin, is) => {
  let contract;
  let web3 = new Web3(window.ethereum);
  if (coin.slice(-4) === "Pool") {
    contract = new web3.eth.Contract(pool_abi, address[coin]);
  } else if (is === "Pool") {
    contract = new web3.eth.Contract(pool_abi, coin);
  } else {
    contract = new web3.eth.Contract(token_abi, coin);
  }
  return {
    web3,
    contract,
  };
};
// Farm数据
/* **
twoImg 不设置则没有第二张图片
isHarvest 是否显示Harvest
available 是否显示available in 7 days
type 1是Single池  2是LP池
unstake 减少的哪一种弹窗 true是普通的减少框/fasle是有说明的弹窗
miningPoolName 1为Farm矿池,2为communityFarm
Harvests 判断释放锁仓本金
*/
export const farmList = [
  {
    id: 0,
    title: "DUSD-USDT",
    myImg: dcc,
    twoImg: usdt, // 不设置则没有第二个图片
    arr: 0,
    earn: "WDCC",
    dccEarned: 0,
    isHarvest: true, // 是否显示Harvest
    dccStaked: 0,
    totalStaked: 0,
    available: false, //是否在Harvest后面显示available in 7 days
    get: "DUSD-USDT",
    viewContract:
      "https://www.dcfsscan.io/address/0x9DAbdd5E15F724448036fB0c0A6155fda97B899b",
    unstake: false,
    getLink:
      "http://www.freeswap.info/#/add/0xAb9014E94Dc999eE0e16A224247B9b1339c5940D/0x19Bf64EeF4CF393C56739137Ba1a6B1EEB26eceB",
    iden: "Common",
    idenIcon: manypeople,
    contractAddress: DUSDUsdtPoolAddr,
    lpAddress: lpTokenUsdtAddr, //质押币
    name: "DUSDUsdtPool",
    crowd: 1,
    subIsTime: true,
    type: 1,
    miningPoolName: 1,
    miningPeriod: 60,
    total: 192000,
  },
  // {
  //   id: 1,
  //   title: "WDCC",
  //   myImg: dcc,
  //   //twoImg: bnb, // 不设置则没有第二个图片
  //   arr: 0,
  //   earn: "WDCC",
  //   dccEarned: 0,
  //   isHarvest: true, // 是否显示Harvest
  //   dccStaked: 0,
  //   totalStaked: 0,
  //   available: false, //是否在Harvest后面显示available in 7 days
  //   get: "WDCC",
  //   viewContract: "https://www.dcfsscan.io/",
  //   unstake: false,
  //   getLink: "http://www.freeswap.info/#/swap",
  //   iden: "Common",
  //   idenIcon: manypeople,
  //   contractAddress: tokenThreeLeadersPoolAddr,
  //   lpAddress: tokenAddr, //质押币
  //   name: "tokenThreeLeadersPool",
  //   crowd: 2,
  //   subIsTime: true,
  //   type: 1,
  //   miningPoolName: 1,
  //   miningPeriod: 30,
  // },
  // {
  //   id: 1,
  //   title: "DCC-USDT",
  //   myImg: dcc,
  //   twoImg: usdt,
  //   arr: 0,
  //   earn: "DCC",
  //   dccEarned: 0,
  //   isHarvest: true,
  //   dccStaked: 0,
  //   available: false,
  //   totalStaked: 0,
  //   get: "DCC-USDT LP",
  //   viewContract:
  //     "https://bscscan.com/address/0xe9c08d8f8adec7fda6dc64d352ec901f9df1802a",
  //   type: 2,
  //   contractAddress: tokenUsdtPoolAddr,
  //   lpAddress: lpTokenUsdtAddr, //质押币
  //   name: "tokenUsdtPool",
  //   getLink:
  //     "https://pancakeswap.finance/add/0x98779fAc3D808bbe07e137322454980804745BEF/0x55d398326f99059fF775485246999027B3197955",
  //   iden: "Common",
  //   idenIcon: single,
  //   time: 1640690986,
  // },
  // {
  //   id: 2,
  //   title: "DCC",
  //   myImg: dcc,
  //   twoImg: "",
  //   arr: 0,
  //   earn: "DCC",
  //   dccEarned: 0,
  //   isHarvest: false,
  //   dccStaked: 0,
  //   available: true,
  //   totalStaked: 0,
  //   get: "DCC",
  //   viewContract:
  //     "https://bscscan.com/address/0x98779fac3d808bbe07e137322454980804745bef",
  //   type: 1,
  //   lpAddress: tokenAddr, //质押币
  //   contractAddress: tokenUsdtDayPoolAddr,
  //   name: "tokenUsdtDayPool",
  //   getLink:
  //     "https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059ff775485246999027b3197955&outputCurrency=0x98779fac3d808bbe07e137322454980804745bef",
  //   iden: "Common",
  //   idenIcon: single,
  //   time: 1640690986,
  // },
];

// Community Farm数据
/* **
twoImg 不设置则没有第二张图片
isHarvest 是否显示Harvest
available 是否在Harvest后面显示available in 7 days
type 1是Single池  2是LP池
unstake 减少的哪一种弹窗 true是普通的减少框/fasle是有说明的弹窗
crowd  1为Users 2为 Node
subIsTime 是否在减少按钮上加时间限制
*/
export const communityFarmList = [
  {
    id: 0,
    title: "DUSD-DCC",
    myImg: dcc,
    twoImg: usdt, // 不设置则没有第二个图片
    arr: 0,
    earn: "WDCC",
    dccEarned: 0,
    isHarvest: true, // 是否显示Harvest
    dccStaked: 0,
    totalStaked: 0,
    available: false, //是否在Harvest后面显示available in 7 days
    get: "DUSD-DCC",
    viewContract:
      "https://www.dcfsscan.io/address/0xaa52F6F8a3Db8c027aADC2D5767b0B590e8C2973",
    unstake: false,
    getLink:
      "http://www.freeswap.info/#/add/0xAb9014E94Dc999eE0e16A224247B9b1339c5940D/DCC",
    iden: "Common",
    idenIcon: manypeople,
    contractAddress: tokenUsdtDayPoolAddr,
    lpAddress: lpdusdDccAddr, //质押币
    name: "tokenUsdtDayPool",
    crowd: 1,
    subIsTime: true,
    type: 2,
    miningPoolName: 2,
    miningPeriod: 60,
    total: 1728000,
  },
  // {
  //   id: 1,
  //   title: "DUSD-DCC",
  //   myImg: dcc,
  //   twoImg: usdt, // 不设置则没有第二个图片
  //   arr: 0,
  //   earn: "WDCC",
  //   dccEarned: 0,
  //   isHarvest: true, // 是否显示Harvest
  //   dccStaked: 0,
  //   totalStaked: 0,
  //   available: false, //是否在Harvest后面显示available in 7 days
  //   get: "DUSD-DCC",
  //   viewContract:
  //     "https://www.dcfsscan.io/address/0x12Bf8284421b5c86Df2dfEC09E60eaFF87823ca6",
  //   unstake: false,
  //   getLink:
  //     "http://www.freeswap.info/#/add/0xAb9014E94Dc999eE0e16A224247B9b1339c5940D/DCC",
  //   iden: "Common",
  //   idenIcon: manypeople,
  //   contractAddress: tokenUsdtDayTwoPoolAddr,
  //   lpAddress: lpdusdDccAddr, //质押币
  //   name: "tokenUsdtDayTwoPool",
  //   crowd: 2,
  //   subIsTime: true,
  //   type: 2,
  //   miningPoolName: 2,
  //   miningPeriod: 30,
  // },
  {
    id: 2,
    title: "WDCC",
    myImg: dcc,
    //twoImg: usdt, // 不设置则没有第二个图片
    arr: 0,
    earn: "WDCC",
    dccEarned: 0,
    isHarvest: true, // 是否显示Harvest
    dccStaked: 0,
    totalStaked: 0,
    available: false, //是否在Harvest后面显示available in 7 days
    get: "WDCC",
    viewContract:
      "https://www.dcfsscan.io/address/0x6aCd2DE0E6Cf45185a3182bECbd4C0076c1c451f",
    unstake: false,
    getLink: "http://www.freeswap.info/#/swap",
    iden: "Common",
    idenIcon: manypeople,
    contractAddress: tokenThreePoolAddr,
    lpAddress: tokenAddr, //质押币
    name: "tokenThreePool",
    crowd: 1,
    subIsTime: true,
    type: 1,
    miningPoolName: 2,
    miningPeriod: 60,
    total: 384000,
  },

  // {
  //   id: 3,
  //   title: "WDCC",
  //   myImg: dcc,
  //   //twoImg: usdt, // 不设置则没有第二个图片
  //   arr: 0,
  //   earn: "WDCC",
  //   dccEarned: 0,
  //   isHarvest: true, // 是否显示Harvest
  //   dccStaked: 0,
  //   totalStaked: 0,
  //   available: false, //是否在Harvest后面显示available in 7 days
  //   get: "WDCC",
  //   viewContract:
  //     "https://www.dcfsscan.io/address/0x2687BF3FcFFf78A22653199CA2c21B05a4cB1551",
  //   unstake: false,
  //   getLink: "http://www.freeswap.info/#/swap",
  //   iden: "Common",
  //   idenIcon: manypeople,
  //   contractAddress: tokenThreeLeadersPoolAddr,
  //   lpAddress: tokenAddr, //质押币
  //   name: "tokenThreeLeadersPool",
  //   crowd: 2,
  //   subIsTime: true,
  //   type: 1,
  //   miningPoolName: 2,
  //   miningPeriod: 30,
  // },
];
