import { UseAppDispatch, useAppSelector } from "components/App/hooks";
import icon_close from "../../assets2/image/icon_close.svg";

import { customStylesModal, ListSocial } from "config/constants";
import {
  selectInfoFewcha,
  updateInfoFewchaWallet,
} from "feature/wallet/fewchaSlice";
import React, { useState } from "react";
import Modal from "react-modal";
import img_nft_demo from "../../assets2/image/NFT1.jpg";

type Balance = number | null;

const SectionImg: React.FC<{ className?: string }> = ({ className }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [balance, setBalance] = useState<Balance>(null);
  const [addressWallet, setAddressWallet] = useState<string>("");
  const fewcha = (window as any).fewcha;
  const [showModalSocial, setShowModalSocial] = useState<boolean>(false);

  const dispatch = UseAppDispatch();
  const fewchaInStore = useAppSelector(selectInfoFewcha);
  const isConnectedFewcha = fewchaInStore.isConnected;

  React.useEffect(() => {
    if (isConnected && balance && addressWallet) {
      dispatch(
        updateInfoFewchaWallet({ isConnected, balance, address: addressWallet })
      );
    }
  }, [isConnected, balance, addressWallet]);
  function afterOpenModal() {}
  function closeModal() {
    setShowModalSocial(false);
  }
  const handleConnectWallet = async () => {
    if (fewcha?.isFewcha) {
      const res = await fewcha.connect();
      console.log("fewcha: ", fewcha);
      console.log("Result connect: ", res);
      if (res.status) {
        setIsConnected(true);
        if (res.data?.address) setAddressWallet(res.data?.address);
        const balanceInfo = await fewcha.getBalance();
        const balanceValue =
          balanceInfo?.data[Object.keys(balanceInfo.data)[0]];
        console.log("balance: ", balanceValue);
        setBalance(Number(balanceValue));
      }
    } else {
      window.open(
        "https://chrome.google.com/webstore/detail/fewcha-aptos-wallet/ebfidpplhabeedpnhjnobghokpiioolj",
        "_blank"
      );
    }
  };

  return (
    <div className={className}>
      <img
        src={img_nft_demo}
        alt="NFT"
        className="w-[90%] md:w-[80%] mx-auto rounded-md"
      />
      {!isConnectedFewcha && (
        <div className="text-center mt-[80px]">
          <button
            onClick={handleConnectWallet}
            className="bg-[#7158e2] py-3 w-full text-white rounded-2xl hover:opacity-[0.90]"
          >
            Connect Fewcha Wallet
          </button>
          <p className="mt-2 italic text-[#95a5a6] text-[14px]">
            You need Fewcha Wallet connection to join the event
          </p>
          <p className="mt-8">You are NOT eligibel</p>
        </div>
      )}
      <button
        onClick={() => setShowModalSocial((prev) => !prev)}
        className="block mx-auto mt-5 bg-[#e74c3c] rounded-md text-white px-5 py-1 hover:opacity-[0.85]"
      >
        You need Verify
      </button>
      <Modal
        isOpen={showModalSocial}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStylesModal}
        contentLabel="Verify Social"
      >
        <div className="!max-w-[400px]">
          <div className="flex gap-x-[150px] mb-4">
            <img
              src={icon_close}
              alt="Close Dialog"
              className="hover:cursor-pointer hover:bg-[#ecf0f1] p-1.5 rounded-full"
              onClick={closeModal}
            />
            <p className="font-bold text-xl">Verify</p>
          </div>
          <p className="mb-4">
            If you own any TESTNET BRUH NFTs, you can get a special verifired
            role in the TESTNET BRUH Discord server
          </p>
          {ListSocial &&
            ListSocial.map((item) => (
              <div
                key={item.id}
                className="flex border border-gray-500 mb-4 px-4 py-3 items-center rounded-md"
              >
                <p className="py-2 px-4 mr-2 border border-[#2c3e50] rounded-full">
                  {item.id}
                </p>
                <p>{item.des}</p>
                <div className="ml-auto flex gap-x-2 bg-gray-300 rounded-xl px-4 py-1.5 hover:cursor-pointer hover:opacity-[0.85]">
                  <span>{item.name}</span>
                  <img src={item.icon} alt={item.name} />
                </div>
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
};

export default SectionImg;
