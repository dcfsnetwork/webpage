import React, { useState, useEffect } from "react";
import { Select, Input, Button, message } from "antd";
import { useTranslation } from "react-i18next";
import {
  farmList,
  communityFarmList,
  globalParam,
  initContracts,
} from "../../chain/config";
import { useWallet } from "use-wallet";
import "./parameter.less";
const { Option } = Select;
const Parameter = (props) => {
  const { t } = useTranslation();
  let { account } = useWallet();
  const [contractAddress, setContractAddress] = useState([]);
  // 选择的合约地址
  const [activeAddress, ActiveAddress] = useState("");
  // 第一个值
  const [numone, setNumOne] = useState(0);
  // 第二个值
  const [numtwo, setNumTwo] = useState(0);
  // 第三个值
  const [numtherr, setNumTherr] = useState(0);

  // 第一个框
  const [inputOneVal, setInputOneVal] = useState("");
  // 第二个框
  const [inputTwoVal, setInputTwoVal] = useState("");
  // 第三个框
  const [inputTherrVal, setInputTherrVal] = useState("");
  const [isGoHome, setIsGoHome] = useState(false);
  useEffect(async () => {
    if (isGoHome) {
      props.history.push("/");
      return message.info("You do not have permission");
    }
    setConAdd();
  }, []);
  const setConAdd = () => {
    let newArr = [...farmList, ...communityFarmList];
    let arr = [];
    newArr.forEach((item) => {
      let obj = {
        id: arr.length,
        contractAddress: item.contractAddress,
        miningPoolName: item.miningPoolName,
        title: item.title,
        crowd: item.crowd,
      };
      arr.push(obj);
    });
    setContractAddress(arr);
  };
  useEffect(async () => {
    if (activeAddress) {
      let Day = await initContracts(activeAddress, "Pool")
        .contract.methods.Day()
        .call();
      setNumOne(Day);
      let Duration = await initContracts(activeAddress, "Pool")
        .contract.methods.DURATION()
        .call();
      setNumTwo(Duration);
    }
    console.log("account", account, activeAddress);
  }, [account, activeAddress]);
  const onChange = (value) => {
    ActiveAddress(value);
  };
  const onSearch = (val) => {
    console.log("search:", val);
  };
  const oneChange = ({ target: { value } }) => {
    setInputOneVal(value);
  };
  const twoChange = ({ target: { value } }) => {
    setInputTwoVal(value);
  };
  const therrChange = ({ target: { value } }) => {
    setInputTherrVal(value);
  };

  /* Write
  num为1 第一个框按钮，2 第二个框按钮，3 第三个框按钮
  */
  const setWrite = async (num) => {
    if (!activeAddress) {
      return message.error("请选择合约地址");
    }
    let owner = await initContracts(activeAddress, "Pool")
      .contract.methods.owner()
      .call();
    if (owner !== account) {
      return message.error("你没有权限操作请切换这个地址操作：" + owner);
    }
    console.log("isGoHome", owner);
    let val = "";
    if (num === 1) {
      val = inputOneVal;
      if (!val) {
        return message.error("请输入数量");
      }
      await initContracts(activeAddress, "Pool")
        .contract.methods.setDay(val)
        .send({ from: globalParam.user });
    } else if (num === 2) {
      val = inputTwoVal;
      if (!val) {
        return message.error("请输入数量");
      }
      await initContracts(activeAddress, "Pool")
        .contract.methods.setDuration(val)
        .send({ from: globalParam.user });
    } else if (num === 3) {
      val = inputTherrVal;
      if (!val) {
        return message.error("请输入数量");
      }
      await initContracts(activeAddress, "Pool")
        .contract.methods.notifyRewardAmount(val)
        .send({ from: globalParam.user });
    }

    // 这里取 输入框的值是 val

    // 给数值复制也是 把要给的值给number就可以
    // let number = 0;
    // if (num === 1) {
    //   setNumOne(number);
    // } else if (num === 2) {
    //   setNumTwo(number);
    // } else if (num === 3) {
    //   setNumTherr(number);
    // }
  };
  return (
    <div className="parameter">
      <div className="select_address">
        <Select
          showSearch
          placeholder="合约"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          style={{ width: "100%" }}
        >
          {contractAddress.map((item, i) => {
            return (
              <Option value={item.contractAddress} key={i}>
                {item.contractAddress} &nbsp;&nbsp;&nbsp;&nbsp;
                {item.miningPoolName === 1 ? "Farm" : "CommunityFarm"}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {item.crowd === 1 ? t("Users") : t("Leaders")}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {item.title}
              </Option>
            );
          })}
        </Select>
      </div>

      <div className="con">
        <div className="one_line">
          <p>Set Day</p>
          <div className="input">
            <Input
              style={{ width: "6rem", height: "0.5rem" }}
              onChange={oneChange}
            />
            <Button
              type="primary"
              className="write"
              onClick={() => setWrite(1)}
            >
              Write
            </Button>
            <div className="num">
              <span>当前数值:</span>
              {numone}
            </div>
          </div>
        </div>
        <div className="one_line">
          <p>Set Duration</p>
          <div className="input">
            <Input
              style={{ width: "6rem", height: "0.5rem" }}
              onChange={twoChange}
            />
            <Button
              type="primary"
              className="write"
              onClick={() => setWrite(2)}
            >
              Write
            </Button>
            <div className="num">
              <span>当前数值:</span>
              {numtwo}
            </div>
          </div>
        </div>
        <div className="one_line">
          <p>Set Supply</p>
          <div className="input">
            <Input
              style={{ width: "6rem", height: "0.5rem" }}
              onChange={therrChange}
            />
            <Button
              type="primary"
              className="write"
              onClick={() => setWrite(3)}
            >
              Write
            </Button>
            {/*<div className="num">*/}
            {/*  <span>当前数值:</span>*/}
            {/*  {numtherr}*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Parameter;
