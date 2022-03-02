import loadable from "react-loadable";
import Loading from "../components/Loading";

import Home from "./Home";
import Farm from "./Farm";
import Communityfarm from "./Communityfarm";
import Parameter from "./Parameter";
const importViw = (url) => {
  return loadable({
    loader: () => import(`${url}`),
    loading: Loading,
  });
};

export default {
  Home,
  Farm,
  Communityfarm,
  Parameter,
};
