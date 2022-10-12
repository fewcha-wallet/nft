import Web3, { Web3Provider } from "@fewcha/web3";
import { useWeb3 } from "@fewcha/web3-react";
import Header from "components/Header/Header";
import NFTv2 from "components/NFT/NFTv2";
import EventPage from "pages/eventPage";
import MintNFTPage from "pages/mintNFT";
import left from "public/svgs/left.svg";
import right from "public/svgs/right.svg";
import React from "react";
import Modal from "react-modal";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const App: React.FC = () => {
  const fewcha = (window as any).fewcha;
  const provider = new Web3Provider(fewcha);
  const web3 = new Web3(provider);
  const { account: web3Account, isConnected } = useWeb3();

 

  return (
    <div className="relative main-bg">
      {/* <img className=" main-bg-left" src={left} alt="left" />
      <img className="main-bg-right" src={right} alt="right" /> */}
      <Header
        wallet={web3}
        web3Account={web3Account}
        isConnected={isConnected}
      />
      <Routes>
        <Route path="/" element={<MintNFTPage />} />
        <Route path="/mint-nft" element={<MintNFTPage />} />
        <Route path="/event" element={<EventPage />} />
      </Routes>

      {/* <NFTv2 wallet={web3} /> */}
      <ToastContainer />
    </div>
  );
};

export default App;
