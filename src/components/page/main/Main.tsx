import React from "react";
import Header from "../../common/Header";
import MainSearchBar from "./components/MainSearchBar";
import MainPopularBook from "./components/MainPopularBook";
import MainGovernmentFund from "./components/MainGovernmentFund";
import MainEarlyStartupData from "./components/MainEarlyStartupData";
import MainStartupInformation from "./components/MainStartupInformation";
import Bottom from "../../common/Bottom";

const Main: React.FC = () => {
  return (
    <div className="w-full text-left ">
      <Header />
      <MainSearchBar />
      <MainPopularBook />
      <MainGovernmentFund />
      <MainEarlyStartupData />
      <MainStartupInformation />
      <Bottom />
    </div>
  );
};

export default Main;
