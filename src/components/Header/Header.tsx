import Aptos from "@fewcha/web3";
import { PublicAccount } from "@fewcha/web3/dist/types";
import { UseAppDispatch, useAppSelector } from "components/App/hooks";
import {
  HasConnectWalletType,
  listWalletData,
  LogoType,
  NameWallet
} from "components/App/type";
import { customStylesModal, MENUS, msgFewcha, msgMartian, msgPetra, optionsToastify } from "config/constants";
import { disConnectWallet, selectIsConnected, selectWallet, updateWallet } from "feature/wallet/wallet";
import { myToast, notInstall } from "libs/libs";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import cn from "services/cn";
import styled from "styled-components";
import { truncateEthAddress } from "utils/address";
import icon_chevron_down from "../../assets2/image/chevron_down.svg";
import icon_chevron_up from "../../assets2/image/chevron_up.svg";
import icon_close from "../../assets2/image/icon_close.svg";
import logo_fewcha from "../../assets2/image/logo_fewcha.jpg";
import logo_martian from "../../assets2/image/logo_martian.jpg";
import logo_petra from "../../assets2/image/logo_petra.jpg";
import icon_check from "../../assets2/image/icon_check.svg";
import logo from "../../public/svgs/logo.svg";
import { Title3 } from "../common/StyledComponent";
import MobileMenu from "./MobileHeader";

const ListWallet = styled.aside``;
const WalletItem = styled.div``;
const WalletSummaryInfo = styled.div``;

const Header: React.FC<{
  wallet: Aptos;
  web3Account: PublicAccount;
  isConnected: boolean;
}> = ({ wallet, web3Account, isConnected }) => {
  const [showMobile, setShowMobile] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [addressCurrentWallet, setAddressCurrentWallet] = useState<string>("");
  const [nameCurrentWallet, setNameCurrentWallet] = useState<NameWallet>("");
  const [hasConnectAnyWallet, setHasConnectAnyWallet] =
    useState<HasConnectWalletType>();

  const [currentLogo, setCurrentLogo] = useState<LogoType>();
  const [currentPage, setCurrentPage] = useState("/");
  const [pathName, setPathName] = useState<string | undefined>();
  const dispatch = UseAppDispatch();
  const myLocation = useLocation();

  const [isConnectedWallet, setIsConnectedWallet] = useState<boolean>(false);

  const walletInStore = useAppSelector(selectWallet)

  const isConnectedInStore = useAppSelector(selectIsConnected)
  // console.log("isConnectedInStore: ", isConnectedInStore);

  useEffect(() => {
    if(isConnectedInStore){
      setAddressCurrentWallet(walletInStore.address)  
      setNameCurrentWallet(walletInStore.name)
    }
  },[isConnectedInStore,walletInStore.name])


  const reset = () => {
    setNameCurrentWallet(null);
    setAddressCurrentWallet("");
    setIsConnectedWallet(false);
    setShowMore(false);
  }

  const disconnect = () => dispatch(disConnectWallet())

  const success = (name: NameWallet, address: string, time: number = 1000): void => {
    setNameCurrentWallet(name);
    setAddressCurrentWallet(address)
    setHasConnectAnyWallet(true);
    setIsConnectedWallet(true);
    setTimeout(() => {
      setShowModal(false);
    }, time);
    dispatch(updateWallet({ name, address, isConnected: isConnectedWallet }))
  }


  useEffect(() => {
    setPathName(myLocation.pathname);
  }, [myLocation.pathname]);

  const toggleMobile = () => {
    setShowMobile(!showMobile);
    if (showMobile) document.body.style.overflow = "";
    else document.body.style.overflow = "hidden";
  };


  useEffect(() => {
    if (!nameCurrentWallet) {
      setHasConnectAnyWallet(false);
      setCurrentLogo("");
      return;
    }
    setHasConnectAnyWallet(true);
    switch (nameCurrentWallet) {
      case "fewcha":
        setCurrentLogo(logo_fewcha);
        break;
      case "martian":
        setCurrentLogo(logo_martian);
        break;
      case "petra":
        setCurrentLogo(logo_petra);
        break;
      default: return;
    }
  }, [nameCurrentWallet]);

  // ---------> CONNECT WALLET --------->
  function handleConnect(name: NameWallet) {
    console.log('name:', name)
    if(name===nameCurrentWallet){
      myToast(`You are already connected to this wallet.`,"warning")
      return;
    }
    if (name === 'fewcha') {
      handleConnectFewchaWallet();
    } else if (name === 'martian') {
      handleConnectMartianWallet();
    } else {
      handleConnectPetraWallet();
    }
  }


  // ----> CONNECT FEWCHA WALLET ---->
  async function handleConnectFewchaWallet() {
    console.log("------> CONNECT FEWCHA ------>");
    const fewcha = (window as any).fewcha;
    console.log("fewcha: ", fewcha)
    if (fewcha) {
      try {
        if (nameCurrentWallet === "fewcha") {
          myToast("You are currently connected to this wallet", "info", 1200)
          return;
        }
        const res = await (fewcha as any).connect();
        console.log("res: ", res);

        if (res.status === 200 && res.data.address) {
          success("fewcha", res.data.address)
          myToast("Connect Fewcha successfully!")
        } else if (res.status === 401) {
          myToast("Please create wallet first!", "warning", 1000)
        }
      } catch (error) {
        console.log("Error: ", error);
        myToast("Can not connect Fewcha wallet", "error")
      }
    } else {
      notInstall(msgFewcha.msg, msgFewcha.urlExt)
      return;
    }
  }

  // ----> CONNECT MARTIAN WALLET ---->
  async function handleConnectMartianWallet() {
    console.log("------> CONNECT MARTIAN WALLET ------>");
    const martian = (window as any).martian;
    console.log("martian", martian);
    if (martian) {
      try {
        const res = await martian.connect();
        console.log("Result Connect Martian: ", res);
        if (res.status === 200 && res.address) {
          success("martian", res.address)
          myToast("Connect Martian wallet successfully!")
        }
      } catch (error) {
        console.log("error ---> ", error);
        toast(" Wallet setup required", optionsToastify);
      }
    } else {
      notInstall(msgMartian.msg, msgMartian.urlExt)
    }
  }

  // -----> CONNECT PETRA WALLET ---->
  async function handleConnectPetraWallet() {
    console.log("------> CONNECT PETRA WALLET ------>");
    const petra = (window as any).petra;
    console.log("petra", petra);
    if (petra) {
      const resultConnect = await petra.connect();
      console.log("Result connect Petra: ", resultConnect);
      if (resultConnect.address) {
        success("petra", resultConnect.address)
        myToast("Connect Petra Wallet successfully!")
      }
    } else {
      notInstall(msgPetra.msg, msgPetra.urlExt)
      setShowModal(false)
    }
  }

  // ----> DISCONNECT  WALLET ---->
  async function handleDisconnectWallet() {
    if (!hasConnectAnyWallet) return;
    console.log("DISCONNECT  WALLET ----> ");
    if (nameCurrentWallet === "fewcha") {
      console.log("DISCONNECT FEWCHA WALLET ----> ");
      try {
        const response = await (window as any).fewcha.disconnect();
        console.log("response: ", response);
        if (response.data) {
          reset()
          disconnect()
        }
      } catch (error) {
        console.log(error);
      }
    } else if (nameCurrentWallet === "martian") {
      console.log("DISCONNECT MARTIAN WALLET");
      try {
        const res = await (window as any).martian.disconnect();
        if (res.method) {
          reset()
          disconnect()
        }
        console.log("res: ", res);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("DISCONNECT PETRA WALLET ----> ");
      try {
        const response = await (window as any).petra.disconnect();
        console.log('response: ', response)

        const isConnectedAfterDisconnect = await (
          window as any
        ).petra.isConnected();
        if (!isConnectedAfterDisconnect) {
          reset()
          disconnect()
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  // ------> SELECT OTHER WALLET ----->
  function handleSlectOtherWallet(e: any) {
    e.stopPropagation();
    setShowModal(true);
    setShowMore(false);
  }

  // ---> CONTROL MODAL MULTI WALLET (SHOW/HIDE MODAL) ---->
  const handleShowDialogWallet = () => {
    setShowModal(true);
  };
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setShowModal(false);
  }

  function connectWalletAndAfterConnect() {
    if (hasConnectAnyWallet) {
      return (
        <WalletSummaryInfo>
          <div className="flex justify-between gap-x-2 items-center relative mb-1">
            {addressCurrentWallet && (
              <div className="flex items-center gap-x-1.5 pl-1">
                <img
                  src={currentLogo}
                  alt="Fewcha Wallet"
                  className="w-6 h-6 rounded-full"
                />
                <p className="font-bold">
                  {truncateEthAddress(addressCurrentWallet)}
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
              onClick={handleDisconnectWallet}
              className="text-white hover:cursor-pointer absolute font-bold  bg-[#34495e] max-w-max px-3 rounded min-h-[64px] shadow py-2"
            >
              <article className="flex gap-x-2 mb-1 items-center hover:text-red-500">
                <p>Disconnect</p>
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
        </WalletSummaryInfo>
      );
    }
    return (
      <div className="relative flex items-center gap-6 px-3 md:px-0">
        <button
          onClick={handleShowDialogWallet}
          className="hidden sm:inline-block px-5 py-2.5 bg-black text-white font-medium rounded-[34px]"
        >
          Connect Wallet
        </button>

        <div
          className={`block md:hidden hambuger ${showMobile ? "is-active" : ""
            }`}
          onClick={toggleMobile}
        >
          <span className="line"></span>
        </div>
      </div>
    );
  }

  // -----> RENDER UI ----->
  return (
    <header
      className={
        showMobile
          ? "pt-4 fixed top-0 left-0 right-0 w-full z-[999] transition-all ease-in-out duration-300"
          : "relative py-2 top-0 left-0 right-0 w-full z-[999] transition-all ease-in-out duration-300 bg-[#718093] text-white"
      }
    >
      <Modal
        isOpen={showModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStylesModal}
        contentLabel="Select Wallet"
      >
        <section className="w-[460px] min-h-[220px] ">
          <Title3>Select Wallet</Title3>
          <button
            onClick={closeModal}
            className="cursor-pointer absolute top-4 right-5 hover:bg-[#ecf0f1] p-2 rounded-full group"
            title="Close Dialog Choose Wallet"
          >
            <img src={icon_close} alt="Close Dialog Choose Wallet" />
          </button>

          <ListWallet className="mt-3  font-medium">
            {listWalletData.map((wallet) => (
              <WalletItem
                key={wallet.name}
                className={cn("py-3 flex items-center gap-x-3.5 mb-2 px-4 rounded-md hover:cursor-pointer hover:bg-[#ffcccc] hover:text-[#17c0eb]", {
                  "hover:bg-gray-200 hover:!text-gray-100": wallet.name === nameCurrentWallet,
                })}
                onClick={() => handleConnect(wallet.name)}
              >
                <img
                  src={wallet.logo}
                  alt={wallet.label}
                  className="w-8 h-8 rounded-full "
                />
                <p className="uppercase">{wallet.label}</p>
                {wallet.name === nameCurrentWallet &&
                  <div className="flex items-center gap-x-4">
                    <p className="text-blue-500 pl-2 text-[14px] italic">Connected</p>
                    <img src={icon_check} alt="Connected" />
                  </div>
                }
              </WalletItem>
            ))}
          </ListWallet>
        </section>
      </Modal>

      <div
        className={cn("container xs:px-13 flex items-center justify-between", {
          "": pathName === "/event",
        })}
      >
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="max-w-[105px] md:max-w-[155px]"
            onClick={() => setCurrentPage("/")}
          />
        </Link>
        {MENUS &&
          MENUS.map((item) => {
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setCurrentPage(item.path)}
                className={cn("mt-1.5 font-bold text-xl", {
                  "text-[#e67e22]": currentPage === item.path,
                })}
              >
                {item.label}
              </Link>
            );
          })}
        {connectWalletAndAfterConnect()}
      </div>

      <MobileMenu isShow={showMobile} />
    </header>
  );
};

export default Header;
