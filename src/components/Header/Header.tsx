import React, { useEffect, useState } from "react";
import { truncateEthAddress } from "utils/address";
import { WalletAlt } from "@styled-icons/boxicons-solid";
import { MENUS } from "config/constants";
import logo from "../../public/svgs/logo.svg";
import MobileMenu from "./MobileHeader";
// import MobileMenu from "./MobileMenu";
// import { useWeb3 } from "components/Provider";
// import { AptosAccount, MaybeHexString } from "@fewcha/aptos";
import Aptos, { Web3Provider } from "@fewcha/web3";
import { useWeb3 } from "@fewcha/web3-react";
import Web3 from "@fewcha/web3";
import { PublicAccount } from "@fewcha/web3/dist/types";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { Title3 } from "../common/StyledComponent";
import icon_close from "../../assets2/image/icon_close.svg";
import icon_check from "../../assets2/image/icon_check.svg";
import logo_fewcha from "../../assets2/image/logo_fewcha.jpg";
import logo_martian from "../../assets2/image/logo_martian.jpg";
import logo_petra from "../../assets2/image/logo_petra.jpg";
import icon_chevron_down from "../../assets2/image/chevron_down.svg";
import icon_chevron_up from "../../assets2/image/chevron_up.svg";

import icon_arrow_right_exit from "../../assets2/image/icon_arrow_right_exit.svg";

import styled from "styled-components";
import { toast, ToastOptions } from "react-toastify";
import { AnyArray } from "immer/dist/internal";
import cn from "services/cn";

const ListWallet = styled.aside``;
const WalletItem = styled.div``;

type NameWallet = "fewcha" | "petra" | "martian" | "";

const Header: React.FC<{
  wallet: Aptos;
  web3Account: PublicAccount;
  isConnected: boolean;
}> = ({ wallet, web3Account, isConnected }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      padding: "24px",
      borderRadius: "14px",
    },
  };

  const options: ToastOptions<{}> = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type:'success'
  };
  const [showMobile, setShowMobile] = useState(false);
  const [balance, setBalance] = useState("0");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addressFewchaWallet, setAddressFewchaWallet] = useState<string>("");
  const [isConnectFewchaWallet, setIsConnectFewchaWallet] =
    useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  const [nameCurrentWallet, setNameCurrentWallet] = useState<NameWallet>("");

  const toggleMobile = () => {
    setShowMobile(!showMobile);
    if (showMobile) document.body.style.overflow = "";
    else document.body.style.overflow = "hidden";
  };
  // useEffect(() => {
  //   if (isConnected && web3Account) {
  //     wallet.action
  //       .getBalance()
  //       .then((data) => {
  //         setBalance(data.data);
  //         console.log("balance--: ", balance);
  //       })
  //       .catch(console.log);
  //   }
  // }, [isConnected, web3Account, wallet]);

  // console.log("balance--: ", balance);

  // ----> CONNECT FEWCHA WALLET ---->
  const handleConnectFewchaWallet = async () => {
    console.log("------> CONNECT FEWCHA =>>");
    try {
      if (isConnectFewchaWallet) {
        toast("You are currently connected to this wallet", options);
        return;
      }
      const res = await wallet.action.connect();
      console.log("res: ", res);
      if (res.status === 200 && res.data.address) {
        setIsConnectFewchaWallet(true);
        setAddressFewchaWallet(res.data.address);
        setNameCurrentWallet("fewcha");
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // ----> DISCONNECT FEWCHA WALLET ---->
  const handleDisConnectFewchaWallet = async () => {
    console.log("DISCONNECT FEWCHA WALLET ----> ");
    try {
      const response = await wallet.action.disconnect();
      console.log("response: ", response);
      if (response.data) {
        setIsConnectFewchaWallet(false);
        setAddressFewchaWallet("");
        setNameCurrentWallet("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConnectMarianWallet = () => {
    toast("Waiting connect martian wallet...", options);
  };

  const handleConnectPetraWallet = () => {
    toast("Waiting connect petra wallet", options);
  };

  // ---> CONTROL MODAL WALLET ---->
  const handleShowDialogWallet = () => {
    setShowModal(true);
  };
  function handleSlectOtherWallet(e: any) {
    e.stopPropagation();
    setShowModal(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setShowModal(false);
  }

  const onShowButton = () => {
    if (isConnectFewchaWallet) {
      return (
        <div>
          <div className="flex justify-between gap-x-2 items-center relative mb-1">
            {addressFewchaWallet && (
              <div className="flex items-center gap-x-1.5 pl-1">
                <img
                  src={logo_fewcha}
                  alt="Fewcha Wallet"
                  className="w-6 h-6 rounded-full"
                />
                <p className="font-bold">
                  {truncateEthAddress(addressFewchaWallet)}
                </p>
              </div>
            )}
            <img
              src={showMore ? icon_chevron_up : icon_chevron_down}
              alt="More"
              title="More - Disconnect"
              className="hover:cursor-pointer relative -top-[2px]"
              onClick={() => setShowMore((prev) => !prev)}
            />
          </div>

          {showMore && (
            <div
              onClick={handleDisConnectFewchaWallet}
              className="text-white hover:cursor-pointer absolute font-bold  bg-[#34495e] max-w-max px-3 rounded min-h-[64px] shadow py-2"
            >
              <article className="flex gap-x-2 mb-1 items-center hover:text-red-500">
                <p>Disconnect</p>
                {/* <img src={icon_arrow_right_exit} alt="Disconnect" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  width="18px"
                  height="18px"
                  fill="currentColor"
                >
                  <path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                </svg>
              </article>
              <p
                onClick={(e) => handleSlectOtherWallet(e)}
                className="py-1 hover:text-blue-500"
              >
                Select Other Wallet
              </p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="relative ml-auto flex items-center gap-6">
          <button
            onClick={handleShowDialogWallet}
            className="hidden sm:inline-block px-6 py-[14px] bg-black text-white font-medium rounded-[34px]"
          >
            Connect Wallet
          </button>

          <div
            className={`block lg:hidden hambuger ${
              showMobile ? "is-active" : ""
            }`}
            onClick={toggleMobile}
          >
            <span className="line"></span>
          </div>
        </div>
      );
    }
  };

  return (
    <header
      className={
        showMobile
          ? "pt-4 fixed top-0 left-0 right-0 w-full z-[999] transition-all ease-in-out duration-300"
          : "relative pt-4 top-0 left-0 right-0 w-full z-[999] transition-all ease-in-out duration-300"
      }
    >
      <div>
        <div>
          <Modal
            isOpen={showModal}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Select Wallet"
          >
            <section className="w-[450px] min-h-[220px] ">
              <Title3>Select Wallet</Title3>
              <button
                onClick={closeModal}
                className="cursor-pointer absolute top-4 right-5 hover:bg-[#ecf0f1] p-2 rounded-full group"
                title="Close Dialog Choose Wallet"
              >
                <img src={icon_close} alt="Close Dialog Choose Wallet" />
              </button>

              <ListWallet className="mt-3 uppercase font-medium">
                <WalletItem
                  className={cn(
                    "py-3 flex items-center gap-x-3.5 mb-2 px-4 rounded-md hover:cursor-pointer hover:bg-[#ffcccc] hover:text-[#17c0eb]",
                    {}
                  )}
                  onClick={handleConnectFewchaWallet}
                >
                  <img
                    src={logo_fewcha}
                    alt="Fewcha Aptos Wallet"
                    className="w-8 h-8 rounded-full"
                  />

                  <p>Fewcha Aptos Wallet</p>
                  {isConnectFewchaWallet && (
                    <div className="flex gap-x-8 items-center">
                      <span className="text-sm italic">(connected)</span>
                      <img src={icon_check} alt="Connected" />
                    </div>
                  )}
                </WalletItem>

                <WalletItem
                  className="py-3 flex items-center gap-x-3.5 mb-2 px-4 rounded-md hover:cursor-pointer hover:bg-[#ffcccc] hover:text-[#17c0eb]"
                  onClick={handleConnectMarianWallet}
                >
                  <img
                    src={logo_martian}
                    alt="Martian Aptos Wallet"
                    className="w-8 h-8 rounded-full "
                  />
                  <p>Martian Aptos Wallet</p>
                </WalletItem>

                <WalletItem
                  className="py-3 flex items-center gap-x-3.5 mb-2 px-4 rounded-md hover:cursor-pointer hover:bg-[#ffcccc] hover:text-[#17c0eb]"
                  onClick={handleConnectPetraWallet}
                >
                  <img
                    src={logo_petra}
                    alt="Petra Aptos Wallet"
                    className="w-8 h-8 rounded-[3px] "
                  />
                  <p>Petra Aptos Wallet</p>
                </WalletItem>
              </ListWallet>
            </section>
          </Modal>
        </div>
      </div>

      <div className="container xs:px-13 flex items-center">
        <div>
          <a className="block">
            <img
              src={logo}
              alt="logo"
              className="max-w-[105px] md:max-w-[155px]"
            />
          </a>
        </div>

        <div className="hidden lg:flex items-center justify-end flex-1 gap-x-10 pr-[36px]">
          {MENUS.map((menu, idx) => {
            if (menu.external) {
              return (
                <div key={idx}>
                  <a
                    href={menu.external}
                    key={idx}
                    target="_blank"
                    rel="noreferrer"
                    className="header-link py-2 block  font-medium font-caption transition-all ease-in duration-150 hover:text-primary-200"
                  >
                    {menu.name}
                  </a>
                </div>
              );
            }

            if (menu.href) {
              return (
                <div key={idx}>
                  <a
                    onClick={(e) => {
                      if (menu.href === "/#roadmap") {
                        e.preventDefault();
                      }
                    }}
                    className="header-link py-2 block  font-medium font-caption hover:text-primary-200"
                  >
                    {menu.name}
                  </a>
                </div>
              );
            }

            return null;
          })}
        </div>
        {onShowButton()}
      </div>
      <MobileMenu isShow={showMobile} />
    </header>
  );
};

export default Header;
