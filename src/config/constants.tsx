import logo_discord from "../../src/assets2/image/discord.svg";
import { ToastOptions } from "react-toastify";

import logo_twitter from "../../src/assets2/image/twitter.svg";

interface MenuItemType {
  path: string;
  label: string;
}

export const MENUS: MenuItemType[] = [
  {
    label: "Mint NFTs",
    path: "/mint-nft",
  },
  {
    label: "Event",
    path: "/event",
  },
];

export const customStylesModal = {
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

interface ItemSocial {
  id: number;
  name: string;
  des: string;
  icon: string;
}
export const ListSocial: ItemSocial[] = [
  {
    id: 1,
    name: "Discord",
    des: "Verify Discord",
    icon: logo_discord,
  },
  {
    id: 2,
    name: "Twitter",
    des: "Verify Twitter",
    icon: logo_twitter,
  },
];
export const optionsToastify: ToastOptions<{}> = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  type: "success",
};
