import { UseAppDispatch, useAppSelector } from "components/App/hooks";
import {
  selectInfoFewcha,
  updateInfoFewchaWallet,
} from "feature/wallet/fewchaSlice";
import React, { useState } from "react";
import img_nft_demo from "../../assets2/image/NFT1.jpg";

type Balance = number | null;

const SectionImg: React.FC<{ className?: string }> = ({ className }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [balance, setBalance] = useState<Balance>(null);
  const [addressWallet, setAddressWallet] = useState<string>("");
  const fewcha = (window as any).fewcha;

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
    </div>
  );
};

export default SectionImg;
