import { optionsToastify } from 'config/constants';
import { toast, TypeOptions } from 'react-toastify';

export const notInstall = (
  msg: string,
  urlExt: string,
  time: number = 2800
) => {
  myToast(msg, "error");
  setTimeout(() => {
    window.open(urlExt);
  }, time);
};

export const myToast = (text: string, type: TypeOptions = "success", timeAutoClose: number = 2000) => {
  return toast(text, { ...optionsToastify, type, autoClose: timeAutoClose })
};