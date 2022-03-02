import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import Header from "../../components/Header";
const Frame = (props) => {
  useEffect(() => {}, []);
  return (
    <div>
      <Header props={props} />
      <div>{props.children}</div>
    </div>
  );
};
export default withRouter(Frame);
