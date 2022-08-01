import React from "react";
// import Web3Provider from "@fewcha/web3-react";
// import Web3Provider from "components/Provider";
import Header from "components/Header/Header";
// import { NFTs } from "components/NFT/NFT";
// import NFTv2 from "components/NFTv2/NFTv2";
// import left from "public/svgs/left.svg";
// import right from "public/svgs/right.svg";

const App: React.FC = () => {
  return (
    // <Web3Provider>
    <div className="relative main-bg">
      {/* <img className=" main-bg-left" src={left} alt="left" />
      <img className="main-bg-right" src={right} alt="right" /> */}
      <Header />
      {/* <NFTs /> */}
      {/* <NFTv2 /> */}
    </div>
    // </Web3Provider>
  );
};

export default App;
