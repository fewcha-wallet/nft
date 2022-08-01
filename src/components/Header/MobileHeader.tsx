import React from "react";
import { MENUS } from "config/constants";
import AtButton from "components/Button/AtButton";
const MobileMenu: React.FC<{ isShow: boolean }> = ({ isShow }) => {
  return (
    <div
      className={`lg:hidden bg-[url('../../public/images/road-map-background.png')] bg-cover bg-no-repeat bg-white list ${
        isShow ? "is-active" : ""
      }`}
    >
      {MENUS.map((menu, idx) => {
        if (menu.external) {
          return (
            <div key={idx}>
              <a
                href={menu.external}
                key={idx}
                target="_blank"
                rel="noreferrer"
                className="block text-normal-400 font-medium text-3xl transition-all ease-in duration-150 hover:text-primary-200  py-4 text-center"
              >
                {menu.name}
              </a>
            </div>
          );
        }

        if (menu.href) {
          return (
            <a
              key={idx}
              className="block text-normal-400 font-medium text-3xl transition-all ease-in duration-150 hover:text-primary-200  py-4 text-center"
            >
              {menu.name}
            </a>
          );
        }
        return null;
      })}{" "}
    </div>
  );
};

export default MobileMenu;
