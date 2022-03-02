import React from "react";
import { useTranslation } from "react-i18next";

const Loading = () => {
  const { t } = useTranslation();
  return <div>{t("Loading")}</div>;
};
export default Loading;
