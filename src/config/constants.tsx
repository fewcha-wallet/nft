import logo_discord from "../../src/assets2/image/discord.svg";
import { toast, ToastOptions, TypeOptions } from "react-toastify";

import logo_twitter from "../../src/assets2/image/twitter.svg";
import { NetworkItem } from "components/App/type";

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
    padding: "24px 12px",
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
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  type: "info",
};

interface MsgType {
  msg: string;
  urlExt: string;
}

export const msgFewcha: MsgType = {
  msg: "You have not installed fewcha wallet app! You will be redirected to the install page",
  urlExt:
    "https://chrome.google.com/webstore/detail/fewcha-aptos-wallet/ebfidpplhabeedpnhjnobghokpiioolj",
};

export const msgMartian: MsgType = {
  msg: "You have not installed martian wallet app! You will be redirected to the install page",
  urlExt:
    "https://chrome.google.com/webstore/detail/martian-aptos-wallet/efbglgofoippbgcjepnhiblaibcnclgk/related",
};
export const msgPetra: MsgType = {
  msg: "You have not installed Petra wallet extension! You will be redirected to the settings page",
  urlExt:
    "https://chrome.google.com/webstore/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci",
};

export const networks: Array<NetworkItem> = [
  // {
  //   type:"Devnet",
  //   label:"Aptos",
  //   url:"https://fullnode.devnet.aptoslabs.com"
  // },
  {
    type: "Testnet",
    label: "Aptos",
    // url:"https://fullnode.testnet.aptoslabs.com"
  },
  // {
  //   type:"AIT3",
  //   label:"Aptos",
  //   url:"https://ait3.aptosdev.com"
  // },
  {
    type: "Devnet",
    label: "SUI",
    // url:"https://gateway.devnet.sui.io"
  },
];

interface NFTItem {
  index: number;
  url: string;
}
export const nfts: NFTItem[] = [
  {
    index: 0,
    url: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/90234375_831684853993938_3886786635118936064_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=pqO6-8q3l9oAX9iiLcL&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT_L7Oot2LWdTCxA_K6i_7jkIeMNjhuBWaf_-QYQigkx8A&oe=636540F5",
  },
  {
    index: 1,
    url: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/90234375_831684853993938_3886786635118936064_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=pqO6-8q3l9oAX9iiLcL&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT_L7Oot2LWdTCxA_K6i_7jkIeMNjhuBWaf_-QYQigkx8A&oe=636540F5",
  },
  {
    index: 2,
    url: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/90234375_831684853993938_3886786635118936064_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=pqO6-8q3l9oAX9iiLcL&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT_L7Oot2LWdTCxA_K6i_7jkIeMNjhuBWaf_-QYQigkx8A&oe=636540F5",
  },
];

export const tabs: { label: string; id: number }[] = [
  {
    id:1,
    label: "Create collection",
  },
  {
    id:2,
    label: "Mint a NFT",
  },
];
