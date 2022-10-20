import Aptos from "@fewcha/web3";
import Error from "components/Error/Error";
import Input from "components/Input/Input";
import { nfts, tabs } from "config/constants";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import cn from "services/cn";
import {
  CollectionType,
  createCollectionResolver,
  mintNFTResolver,
  NFTType,
} from "services/resolver";

const CreateCollection: React.FC<{ wallet: Aptos }> = ({ wallet }) => {
  console.log("wallet: ", wallet);

  const {
    register: collectionRegister,
    handleSubmit: collectionHandleSubmit,
    formState: { errors: createCollectionErrors },
  } = useForm<CollectionType>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: createCollectionResolver,
    shouldFocusError: true,
    shouldUnregister: false,
  });
  const onSubmit: SubmitHandler<CollectionType> = (data) => {
    console.log("Data create collection:  ",data)

    wallet.action?.token
      .createCollection(
        `fewcha try ${data.collection}`,
        `fewcha try ${data.collection} desc`,
        "https://fewcha.app/svgs/logo.svg"
      )
      .then((data) => console.log("DATA:", data))
      .catch((err) => console.log("ERR:", err));
  };
  return (
    <form onSubmit={collectionHandleSubmit(onSubmit)}>
      <div className="flex-row space-y-4 pb-[36px]">
        <div className="text-[20px] leading-[24px] font-medium mt-3">
          Collection Details
        </div>
        <div>
          <Input
            className="bg-[#F1F1F1] text-[18px] leading-[24px]"
            placeholder="Collection name"
            autoComplete="off"
            {...collectionRegister("collection", {
              required: {
                value: true,
                message: "Enter collection name",
              },
            })}
          />
          <Error error={createCollectionErrors.collection} />
        </div>
        <div>
          <button
            type="submit"
            className="text-center w-full focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-400 rounded-2xl py-2 transition duration-150 ease-in"
          >
            <span className="ml-2">Create a collection</span>
          </button>
        </div>
      </div>
    </form>
  );
};

const Mint: React.FC = () => {
  const [img, setImg] = useState(0);

  const {
    register: mintNFTRegister,
    handleSubmit: nftHandleSubmit,
    formState: { errors: mintNFTErrors },
  } = useForm<NFTType>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: mintNFTResolver,
    shouldFocusError: true,
    shouldUnregister: false,
  });

  const onShowNFTimg = () => {
    let result = null;
    result = nfts.map((nft, i) => {
      return (
        <div
          key={i}
          className="relative cursor-pointer"
          onClick={() => onChangeImg(nft.index)}
        >
          <img
            className="object-cover border-none rounded-3xl"
            src={nft.url}
            alt="nft"
          />
          <div
            className={
              img === nft.index
                ? "absolute w-[123px] h-[123px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-[4px] border-black rounded-3xl"
                : ""
            }
          ></div>
        </div>
      );
    });
    return result;
  };

  const onChangeImg = (index: number) => {
    setImg(index);
  };
  const onSubmit: SubmitHandler<NFTType> = (data) => {
    data.url = nfts[img].url;
    console.log(data);
  };
  return (
    <form onSubmit={nftHandleSubmit(onSubmit)}>
      <div className="my-3">
        <div className="flex justify-between leading-[24px] text-[16px]">
          <div className="">Choose a thumbnail</div>
          <div className="text-blue-500 font-medium">Generate</div>
        </div>
        <div className="pt-4 grid grid-cols-3 mx-auto gap-[20px]">
          {onShowNFTimg()}
        </div>
      </div>

      <div className="flex-row space-y-4">
        <div className="text-[20px] leading-[24px] font-medium mt-7">
          NFT Details
        </div>
        <div>
          <Input
            isError={!!mintNFTErrors.collection}
            className="bg-[#F1F1F1] text-[18px] leading-[24px]"
            placeholder="Collection name"
            autoComplete="off"
            {...mintNFTRegister("collection", {
              required: {
                value: true,
                message: "Enter collection for your NFT",
              },
            })}
          />
          <Error error={mintNFTErrors.collection} />
        </div>
        <div>
          <Input
            className="bg-[#F1F1F1] text-[18px] leading-[24px]"
            placeholder="NFT codeanme"
            autoComplete="off"
            {...mintNFTRegister("codename", {
              required: {
                value: true,
                message: "Enter codename for your NFT",
              },
            })}
          />
          <Error error={mintNFTErrors.codename} />
        </div>
        <div>
          <Input
            className="bg-[#F1F1F1] text-[18px] leading-[24px]"
            placeholder="Description"
            autoComplete="off"
            {...mintNFTRegister("description", {
              required: {
                value: true,
                message: "Enter description for your NFT",
              },
            })}
          />
          <Error error={mintNFTErrors.description} />
        </div>
        <div>
          <button
            type="submit"
            className="text-center w-full focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-400 rounded-2xl py-2 transition duration-150 ease-in"
          >
            <span className="ml-2">Mint a NFT</span>
          </button>
        </div>
      </div>
    </form>
  );
};

const MintNFT: React.FC<{ wallet: Aptos }> = ({ wallet }) => {
  const [tab, setTab] = useState<number>(1);

  const onChangeTab = (index: number) => {
    setTab(index);
  };

  return (
    <section className="h-screen relative pt-[80px] ">
      <div className="w-[95%] md:w-[480px] lg:w-[500px] mx-auto bg-white rounded-3xl">
        <div className="flex text-center hover:cursor-pointer">
          {tabs.map((t) => (
            <div
              key={t.id}
              title={t.label}
              onClick={() => setTab(t.id)}
              className={cn(
                "w-1/2 px-[48px] py-[26px] bg-[#F1F1F1] font-semibold text-[18px] leading-[22px] border-none ",
                {
                  "!text-white !bg-black": t.id === tab,
                },
                t.id === 1 ? "rounded-tl-3xl" : "rounded-tr-3xl"
              )}
            >
              {t.label}
            </div>
          ))}
        </div>
        {tab === 1 ? <CreateCollection wallet={wallet} /> : <Mint />}
      </div>
    </section>
  );
};

export default MintNFT;















