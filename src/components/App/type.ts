import logo_fewcha from "../../assets2/image/logo_fewcha.jpg";
import logo_martian from "../../assets2/image/logo_martian.jpg";
import logo_petra from "../../assets2/image/logo_petra.jpg";

export type NameWallet = "fewcha" | "petra" | "martian" | "" | null;
export type BalanceType = number | string | null;
export interface WalletItemType {
  name: NameWallet;
  logo: string;
  label?: string;
}
export type LogoType = string | undefined;
export type HasConnectWalletType = boolean | undefined;

export const listWalletData: Array<WalletItemType> = [
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

export interface NetworkItem {
  type: "Devnet" | "Testnet";
  label: "Aptos" | "SUI";
  url?: string;
}

