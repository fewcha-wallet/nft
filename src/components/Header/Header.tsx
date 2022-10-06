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
import logo_fewcha from "../../assets2/image/logo_fewcha.jpg";
import logo_martian from "../../assets2/image/logo_martian.jpg";
import logo_petra from "../../assets2/image/logo_petra.jpg";
import styled from "styled-components";
import { toast, ToastOptions } from "react-toastify";

const ListWallet = styled.aside``;
const WalletItem = styled.div``;

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
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const [showMobile, setShowMobile] = useState(false);
  const [balance, setBalance] = useState("0");
  const [showModal, setShowModal] = useState<boolean>(false);

  const state_app = useSelector((state: any) => state);

  const toggleMobile = () => {
    setShowMobile(!showMobile);
    if (showMobile) document.body.style.overflow = "";
    else document.body.style.overflow = "hidden";
  };
  useEffect(() => {
    if (isConnected && web3Account) {
      wallet.action
        .getBalance()
        .then((data) => {
          setBalance(data.data);
        })
        .catch(console.log);
    }
  }, [isConnected, web3Account, wallet]);

  const handleConnectWallet = () => {
    setShowModal(true);
  };
  const handleConnectFewchaWallet = () => {
    console.log("run...");
    wallet.action
      .connect()
      .then(() => {
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
      })
      .catch(console.log);
  };

  const handleConnectMarianWallet = () => {
    toast("Waiting connect martian wallet...", options);
    // setShowModal(false)
  };

  const handleConnectPetraWallet = () => {
    toast("Waiting connect petra wallet", options);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setShowModal(false);
  }

  const onShowButton = () => {
    if (isConnected) {
      return (
        <div className="relative ml-auto flex items-center gap-6">
          <button
            className="p-2 shadow rounded bg-white text-sm font-medium text-black ml-auto flex items-center justify-between cursor-pointer"
            onClick={() => {
              wallet.action
                .disconnect()
                .then((data) => console.log(data))
                .catch(console.log);
            }}
          >
            <WalletAlt size={24} />
            <div className="hidden md:flex flex-col ml-2">
              <div className="mb-1">
                {truncateEthAddress(web3Account.address)}
              </div>
              <div>APT: {balance}</div>
            </div>
          </button>
        </div>
      );
    } else {
      return (
        <div className="relative ml-auto flex items-center gap-6">
          <button
            onClick={handleConnectWallet}
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
                  className="py-3 flex items-center gap-x-3.5 mb-2 px-4 rounded-md hover:cursor-pointer hover:bg-[#ffcccc] hover:text-[#17c0eb]"
                  onClick={handleConnectFewchaWallet}
                >
                  <img
                    src={logo_fewcha}
                    alt="Fewcha Aptos Wallet"
                    className="w-8 h-8 rounded-full"
                  />
                  <p>Fewcha Aptos Wallet</p>
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

