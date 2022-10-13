import Web3, { Web3Provider } from "@fewcha/web3";
import NFTv2 from "components/NFT/NFTv2";
import React from "react";

const MintNFTPage: React.FC = () => {
  const fewcha = (window as any).fewcha;
  const provider = new Web3Provider(fewcha);
  const web3 = new Web3(provider);

  return (
    <div className="main-bg">
      <NFTv2 wallet={web3} />
    </div>
  );
};

export default MintNFTPage;
