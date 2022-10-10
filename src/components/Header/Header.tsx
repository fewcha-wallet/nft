import Aptos from "@fewcha/web3";
import { PublicAccount } from "@fewcha/web3/dist/types";
import { MENUS } from "config/constants";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { toast, ToastOptions } from "react-toastify";
import cn from "services/cn";
import styled from "styled-components";
import { truncateEthAddress } from "utils/address";
import icon_chevron_down from "../../assets2/image/chevron_down.svg";
import icon_chevron_up from "../../assets2/image/chevron_up.svg";
import icon_close from "../../assets2/image/icon_close.svg";
import logo_fewcha from "../../assets2/image/logo_fewcha.jpg";
import logo_martian from "../../assets2/image/logo_martian.jpg";
import logo_petra from "../../assets2/image/logo_petra.jpg";
import logo from "../../public/svgs/logo.svg";
import { Title3 } from "../common/StyledComponent";
import MobileMenu from "./MobileHeader";

const ListWallet = styled.aside``;
const WalletItem = styled.div``;
const WalletSummaryInfo = styled.div``;

type NameWallet = "fewcha" | "petra" | "martian" | "";
interface WalletItemType {
  name: NameWallet;
  logo: string;
  label: string;
}
type LogoType = string | undefined;
type HasConnectWalletType = boolean | undefined;

const Header: React.FC<{
  wallet: Aptos;
  web3Account: PublicAccount;
  isConnected: boolean;
}> = ({ wallet, web3Account, isConnected }) => {
  const [showMobile, setShowMobile] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [walletHasBeenSelected, setSelectHasBeenSelected] =
    useState<NameWallet>("");
  const [numberOfClicks, setNumberOfClicks] = useState<number>(0);

  const [addressCurrentWallet, setAddressCurrentWallet] = useState<string>("");
  const [nameCurrentWallet, setNameCurrentWallet] = useState<NameWallet>("");
  const [hasConnectAnyWallet, setHasConnectAnyWallet] =
    useState<HasConnectWalletType>();
  const [currentLogo, setCurrentLogo] = useState<LogoType>();
  const [currentPage, setCurrentPage] = useState("/");

  const listWallet: Array<WalletItemType> = [
    {
      name: "fewcha",
      logo: logo_fewcha,
      label: "Fewcha Aptos Wallet",
    },
    {
      name: "martian",
      logo: logo_martian,
      label: "Martian Aptos Wallet",
    },
    {
      name: "petra",
      logo: logo_petra,
      label: "Petra Aptos Wallet",
    },
  ];
  const toggleMobile = () => {
    setShowMobile(!showMobile);
    if (showMobile) document.body.style.overflow = "";
    else document.body.style.overflow = "hidden";
  };

  const customStylesModal = {
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

  const optionsToastify: ToastOptions<{}> = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: "success",
  };

  // ---------> CONNECT WALLET --------->
  useEffect(() => {
    if (!walletHasBeenSelected) return;
    if (walletHasBeenSelected === "fewcha") {
      handleConnectFewchaWallet();
    } else if (walletHasBeenSelected === "martian") {
      handleConnectMartianWallet();
    } else if (walletHasBeenSelected === "petra") {
      handleConnectPetraWallet();
    }
  }, [walletHasBeenSelected, numberOfClicks]);

  // ----> CONNECT FEWCHA WALLET ---->
  async function handleConnectFewchaWallet() {
    console.log("------> CONNECT FEWCHA ------>");
    const hasFewchaInWindow: boolean | undefined = (window as any).fewcha;
    if (!hasFewchaInWindow) {
      toast(
        "You have not installed fewcha wallet app! You will be redirected to the settings page",
        optionsToastify
      );
      setTimeout(() => {
        window.open(
          "https://chrome.google.com/webstore/detail/fewcha-aptos-wallet/ebfidpplhabeedpnhjnobghokpiioolj",
          "_blank"
        );
      }, 2800);
      return;
    }
    try {
      if (nameCurrentWallet === "fewcha") {
        toast("You are currently connected to this wallet", optionsToastify);
        return;
      }
      const res = await wallet.action.connect();
      console.log("res: ", res);
      if (res.status === 200 && res.data.address) {
        setNameCurrentWallet("fewcha");
        setHasConnectAnyWallet(true);
        setAddressCurrentWallet(res.data.address);
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  // ----> DISCONNECT  WALLET ---->
  async function handleDisconnectWallet() {
    if (!hasConnectAnyWallet) return;
    console.log("DISCONNECT  WALLET ----> ");
    if (nameCurrentWallet === "fewcha") {
      console.log("DISCONNECT FEWCHA WALLET ----> ");
      try {
        const response = await wallet.action.disconnect();
        console.log("response: ", response);
        if (response.data) {
          setNameCurrentWallet("");
          setShowMore(false);
          setSelectHasBeenSelected("");
          setAddressCurrentWallet("");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (nameCurrentWallet === "martian") {
      console.log("DISCONNECT MARTIAN WALLET");
      try {
        const res = await (window as any).martian.disconnect();
        const statusAfterDisconnect = await (
          window as any
        ).martian.isConnected();
        if (res.method && !statusAfterDisconnect) {
          setNameCurrentWallet("");
          setShowMore(false);
          setSelectHasBeenSelected("");
          setAddressCurrentWallet("");
        }
        console.log("res: ", res);
        console.log("statusAfterDisconnect: ", statusAfterDisconnect);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("DISCONNECT PETRA WALLET ----> ");
      try {
        const response = await (window as any).petra.disconnect();
        const isConnectedAfterDisconnect = await (
          window as any
        ).petra.isConnected();
        if (!isConnectedAfterDisconnect) {
          setNameCurrentWallet("");
          setShowMore(false);
          setSelectHasBeenSelected("");
          setAddressCurrentWallet("");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  // ----> CONNECT MARTIAN WALLET ---->
  async function handleConnectMartianWallet() {
    console.log("WINDOW: ", window);
    const hasMartianInWindow = (window as any).martian;
    console.log("hasMartianInWindow", hasMartianInWindow);

    if (!hasMartianInWindow) {
      toast(
        "You have not installed martian wallet extension! You will be redirected to the settings page",
        optionsToastify
      );
      setTimeout(() => {
        window.open(
          "https://chrome.google.com/webstore/detail/martian-aptos-wallet/efbglgofoippbgcjepnhiblaibcnclgk/related",
          "_blank"
        );
      }, 2800);
      return;
    }
    const res = await hasMartianInWindow.connect();
    if (res.status === 200 && res.address) {
      setAddressCurrentWallet(res.address);
      setNameCurrentWallet("martian");
      setHasConnectAnyWallet(true);
      toast("Connect Petra Wallet successfully!", optionsToastify);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
    console.log("res: ", res);
  }

  // -----> CONNECT PETRA WALLET ---->
  async function handleConnectPetraWallet() {
    const hasPetraWalletInWindow = (window as any).petra;
    console.log("hasPetraWalletInWindow", hasPetraWalletInWindow);

    if (!hasPetraWalletInWindow) {
      toast(
        "You have not installed Petra wallet extension! You will be redirected to the settings page",
        optionsToastify
      );
      setTimeout(() => {
        window.open(
          "https://chrome.google.com/webstore/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci",
          "_blank"
        );
      }, 2800);
      return;
    }

    const resultConnect = await hasPetraWalletInWindow.connect();
    console.log("connect petra: ", resultConnect);
    if (resultConnect.address) {
      setNameCurrentWallet("petra");
      setAddressCurrentWallet(resultConnect.address);
      setHasConnectAnyWallet(true);
      toast("Connect Petra Wallet successfully!", optionsToastify);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
  }

  useEffect(() => {
    if (!nameCurrentWallet) {
      setHasConnectAnyWallet(false);
    }
  }, [nameCurrentWallet]);

  useEffect(() => {
    if (nameCurrentWallet === "fewcha") {
      setCurrentLogo(logo_fewcha);
    } else if (nameCurrentWallet === "martian") {
      setCurrentLogo(logo_martian);
    } else {
      setCurrentLogo(logo_petra);
    }
  }, [nameCurrentWallet]);

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
        </WalletSummaryInfo>
      );
    }
    return (
      <div className="relative flex items-center gap-6">
        <button
          onClick={handleShowDialogWallet}
          className="hidden sm:inline-block px-5 py-2.5 bg-black text-white font-medium rounded-[34px]"
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

  return (
    <header
      className={
        showMobile
          ? "pt-4 fixed top-0 left-0 right-0 w-full z-[999] transition-all ease-in-out duration-300"
          : "relative py-2 top-0 left-0 right-0 w-full z-[999] transition-all ease-in-out duration-300 bg-[#718093] text-white"
      }
    >
      {/* # 44bd32 */}
      <Modal
        isOpen={showModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStylesModal}
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

          {/* {isConnectFewchaWallet && (
                    <div className="flex gap-x-8 items-center">
                      <span className="text-sm italic">(connected)</span>
                      <img src={icon_check} alt="Connected" />
                    </div>
                  )} */}

          <ListWallet className="mt-3 uppercase font-medium">
            {listWallet.map((wallet) => (
              <WalletItem
                key={wallet.name}
                className="py-3 flex items-center gap-x-3.5 mb-2 px-4 rounded-md hover:cursor-pointer hover:bg-[#ffcccc] hover:text-[#17c0eb]"
                onClick={() => {
                  setSelectHasBeenSelected(wallet.name);
                  setNumberOfClicks((prev) => (prev += 1));
                }}
              >
                <img
                  src={wallet.logo}
                  alt="Martian Aptos Wallet"
                  className="w-8 h-8 rounded-full "
                />
                <p>{wallet.label}</p>
              </WalletItem>
            ))}

            {/* <WalletItem
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
                </WalletItem>

                <WalletItem
                  className="py-3 flex items-center gap-x-3.5 mb-2 px-4 rounded-md hover:cursor-pointer hover:bg-[#ffcccc] hover:text-[#17c0eb]"
                  onClick={handleConnectMartianWallet}
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
                </WalletItem> */}
          </ListWallet>
        </section>
      </Modal>

      <div className="container xs:px-13 flex items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="max-w-[105px] md:max-w-[155px]"
            onClick={() => setCurrentPage('/')}
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
