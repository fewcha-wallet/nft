import React from "react";
import Header from "components/Header/Header";
import NFTv2 from "components/NFT/NFTv2";
import left from "public/svgs/left.svg";
import right from "public/svgs/right.svg";
import Aptos, { Web3Provider } from "@fewcha/web3";
import { useWeb3 } from "@fewcha/web3-react";
import Web3 from "@fewcha/web3";

const App: React.FC = () => {
  const fewcha = (window as any).fewcha;
  const provider = new Web3Provider(fewcha);
  const web3 = new Web3(provider);
  const { account: web3Account, isConnected } = useWeb3();
  return (
    <div className="relative main-bg">
      <img className=" main-bg-left" src={left} alt="left" />
      <img className="main-bg-right" src={right} alt="right" />
      <Header
        wallet={web3}
        web3Account={web3Account}
        isConnected={isConnected}
      />
      <NFTv2 wallet={web3} />
    </div>
  );
};

export default App;
