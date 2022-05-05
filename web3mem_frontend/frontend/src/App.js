import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "./utils/GagContract.json";

import Header from "./components/Header";
import ImageSender from "./components/ImageSender";
import Content from "./components/Content";

function App() {
  const contractAddress = "0xc42287fAaA0b3FEF469F47FE6D4d362CD47E08b0";
  const contractABI = abi.abi;

  const [currentAccount, setCurrentAccount] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [allImages, setAllImages] = useState([]);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log(
          "Theres no ethereum object! Make sure to install MetaMask!"
        );
      } else {
        console.log("Ethereum object ", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found a authorized accout: ", account);
        setCurrentAccount(account);
        getAllImages();
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("MetaMask not installed!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      console.log("Images in contrac:", allImages);
    } catch (error) {
      console.log(error);
    }
  };

  const sendImageUrl = async (_imageUrl) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const gagContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const sendImageUrlTxn = await gagContract.sendImage(_imageUrl, {
          gasLimit: 300000,
        });
        console.log("Mining...", sendImageUrlTxn.hash);
        await sendImageUrlTxn.wait();
        console.log("Mined: ", sendImageUrlTxn.hash);
      } else {
        console.log("MetaMask not installed!");
      }
    } catch (error) {
      console.log(error);
    }
    setImageUrlInput("");
  };

  const getAllImages = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const gagContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const images = await gagContract.getAllImages();

        let imagesData = [];
        images.forEach((img) => {
          imagesData.push({
            address: img.sender,
            imgUrl: img.imageUrl,
            timestamp: new Date(img.timestamp * 1000),
            likes: img.likes.toNumber(),
          });
        });
        setAllImages(imagesData);
      } else {
        console.log("MetaMask not installed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imgLike = async (id) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const gagContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const imgLikeTxn = await gagContract.like(id);
        console.log("Mining...", imgLikeTxn.hash);
        await imgLikeTxn.wait();
        console.log("Mined: ", imgLikeTxn.hash);
      }
    } catch (error) {
      console.log(error);
    }
    getAllImages();
  };

  useEffect(() => {
    let gagContract;

    const onNewMeme = (from, imageUrl, timestamp, likes) => {
      console.log("newImage", from, imageUrl, timestamp, likes);
      setAllImages((prevState) => [
        ...prevState,
        {
          address: from,
          imgUrl: imageUrl,
          timestamp: new Date(timestamp * 1000),
          likes: likes.toNumber(),
        },
      ]);
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      gagContract = new ethers.Contract(contractAddress, contractABI, signer);
      gagContract.on("newImage", onNewMeme);
    }

    return () => {
      if (gagContract) {
        gagContract.off("newImage", onNewMeme);
      }
    };
  }, []);

  return (
    <div className="App">
      <Header
        currentAccount={currentAccount}
        connectWallet={connectWallet}
      ></Header>
      <main>
        <ImageSender
          imageUrlInput={imageUrlInput}
          setImageUrlInput={setImageUrlInput}
          sendImageUrl={sendImageUrl}
        ></ImageSender>
        <Content allImages={allImages} imgLike={imgLike}></Content>
      </main>
    </div>
  );
}

export default App;
