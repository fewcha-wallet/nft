import Web3, { Web3Provider } from "@fewcha/web3";
import { useWeb3 } from "@fewcha/web3-react";
import Header from "components/Header/Header";
import MintNFT from "components/NFT/MintNFT";
import EventPage from "pages/eventPage";
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
    <div>
      <Header
        wallet={web3}
        web3Account={web3Account}
        isConnected={isConnected}
      />
      <div className="content mt-[44px]">
        <Routes>
          <Route path="/" element={<MintNFT wallet={web3}/>} />
          <Route path="/mint-nft" element={<MintNFT wallet={web3}/>} />
          <Route path="/event" element={<EventPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
