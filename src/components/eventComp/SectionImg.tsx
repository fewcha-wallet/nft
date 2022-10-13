import { UseAppDispatch, useAppSelector } from "components/App/hooks";
import { NameWallet } from "components/App/type";
import { customStylesModal, ListSocial } from "config/constants";
import { selectNameWallet, updateWallet } from "feature/wallet/wallet";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import icon_close from "../../assets2/image/icon_close.svg";
import img_nft_demo from "../../assets2/image/NFT1.jpg";

const SectionImg: React.FC<{ className?: string }> = ({ className }) => {
  const [isConnectedFewcha, setIsConnected] = useState<boolean>(false);
  const [addressFewchaWallet, setAddressWallet] = useState<string>("");
  const [nameFewchaWallet, setNameWallet] = useState<NameWallet>("");
  const fewcha = (window as any).fewcha;
  const [showModalSocial, setShowModalSocial] = useState<boolean>(false);
  const [socialName, setSocialName] = useState<string>("");

  const dispatch = UseAppDispatch();

  function afterOpenModal() {
    console.log("opened");
  }
  function closeModal() {
    setShowModalSocial(false);
  }
  const nameWalletInStore = useAppSelector(selectNameWallet);
  console.log("nameWalletInStore: ", nameWalletInStore);

  useEffect(() => {
    if(nameWalletInStore !== "fewcha"){
      setNameWallet("")
    }
  },[nameWalletInStore])

  useEffect(() => {
    if (!nameFewchaWallet) return;
    console.log("run..");
    dispatch(
      updateWallet({ name: nameFewchaWallet, address: addressFewchaWallet, isConnected:isConnectedFewcha })
    );
  }, [nameFewchaWallet]);

  const handleConnectFewchaWallet = async () => {
    if (fewcha?.isFewcha) {
      const res = await fewcha.connect();
      console.log("fewcha: ", fewcha);
      console.log("Result connect: ", res);
      if (res.status) {
        setIsConnected(true);
        if (res.data?.address) setAddressWallet(res.data?.address);
        setNameWallet("fewcha");
      }
    } else {
      window.open(
        "https://chrome.google.com/webstore/detail/fewcha-aptos-wallet/ebfidpplhabeedpnhjnobghokpiioolj",
        "_blank"
      );
    }
  };

  // -----> SELECT SOCIAL ITEM ----->
  const handleVerify = (name: string) => {
    console.log("name: ", name);
    setSocialName(name);
    setTimeout(() => {
      setShowModalSocial(false);
    }, 500);
  };

  // -----> VERIFY SOCIAL ----->
  useEffect(() => {
    if (!socialName) return;
    if (socialName === "Discord") {
      console.log("verify Discord...");
    } else {
      console.log("verify twitter...");
    }
  }, [socialName]);

  // ----> RENDER UI ------>
  return (
    <div className={className}>
      <img
        src={img_nft_demo}
        alt="NFT"
        className=" md:w-[80%] mx-auto rounded-md"
      />
      {nameWalletInStore !== "fewcha" && (
        <div className="text-center mt-[80px]">
          <button
            onClick={handleConnectFewchaWallet}
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
                <div
                  onClick={() => handleVerify(item.name)}
                  className="ml-auto flex gap-x-2 bg-gray-300 rounded-xl px-4 py-1.5 hover:cursor-pointer hover:opacity-[0.85]"
                >
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
