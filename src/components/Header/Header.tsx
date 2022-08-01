import React, { useEffect, useState } from "react";
// import { truncateEthAddress } from "utils/address";
import { WalletAlt } from "@styled-icons/boxicons-solid";
import { MENUS } from "config/constants";
import logo from "../../public/svgs/logo.svg";
import MobileMenu from "./MobileHeader";
// import MobileMenu from "./MobileMenu";
// import { useWeb3 } from "components/Provider";
// import { AptosAccount, MaybeHexString } from "@fewcha/aptos";

const Header: React.FC = () => {
  const [showMobile, setShowMobile] = useState(false);

  const toggleMobile = () => {
    setShowMobile(!showMobile);
    if (showMobile) document.body.style.overflow = "";
    else document.body.style.overflow = "hidden";
  };

  const [balance, setBalance] = useState("");

  //const aptos = useWeb3();
  //   const { init, account, isConnected, connect, disconnect, web3 } = aptos;
  //console.log(web3);
  //   useEffect(() => {
  //     if (isConnected && account) {
  //       // console.log((account as any).address as MaybeHexString);
  //       // console.log(typeof web3.getAccountResources(account));
  //       // web3.getAccountResources((account as any).address as MaybeHexString).then((data) => {
  //       //   const accountResource = data.find((r) => r.type === "0x1::Coin::CoinStore<0x1::TestCoin::TestCoin>");
  //       //   const balance = (accountResource!.data as { coin: { value: string } }).coin.value;
  //       //   setBalance(balance);
  //       // });
  //     }
  //   }, [isConnected, account, web3, init]);

  const onShowButton = () => {
    if (false) {
      return (
        <div className="relative ml-auto flex items-center gap-6">
          <button
            className="p-2 shadow rounded bg-white text-sm font-medium text-black ml-auto flex items-center justify-between cursor-pointer"
            // onClick={() => disconnect()}
          >
            <WalletAlt size={24} />
            <div className="hidden md:flex flex-col ml-2">
              <div className="mb-1">
                {/* {truncateEthAddress((account as any).address)} */}
              </div>
              <div>APT: {}</div>
            </div>
          </button>
        </div>
      );
    } else {
      return (
        <div className="relative ml-auto flex items-center gap-6">
          <button
            onClick={() => {
              //   connect();
            }}
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

  //   if (!init) return <>Loading...</>;

  return (
    <header
      className={
        showMobile
          ? "pt-4 fixed top-0 left-0 right-0 w-full z-[999] transition-all ease-in-out duration-300"
          : "relative pt-4 top-0 left-0 right-0 w-full z-[999] transition-all ease-in-out duration-300"
      }
    >
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
