'use client';
import React, { useState,useEffect,Dispatch, SetStateAction } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {ethers} from 'ethers'
import axios from 'axios';

interface ProductFormProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Component({ setOpen }: ProductFormProps) {
  const [ethereumAmount, setEthereumAmount] = useState(0.0003);
  const [xpAmount, setXpAmount] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [defaultAccount, setDefaultAccount] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState<string | null>(null);
  const [connButtonText, setConnButtonText] =
    useState<string>("Connect Wallet");
  const [transactionAmount, setTransactionAmount] = useState<string | null>(
    null
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [convertedValue, setConvertedValue] = useState<string | null>(null);
  const [userData, setUserData] = useState([]);

  const userName='hamdan27';

//   const info = async() => {
//     const response = await axios.get(`http://127.0.0.1:8000/users/${username}`);
//     setUserData(response.data); 
// }

// info();





  const handleConvert = () => {
    setXpAmount(xpAmount+1);
  };

  const handleIncreaseEthereum = () => {
    const newEthereumAmount = ethereumAmount + 0.0003;
    setEthereumAmount(newEthereumAmount);
    setXpAmount(xpAmount+1);
    setConvertedValue(newEthereumAmount.toFixed(4));
  };

  const handleDecreaseEthereum = () => {
    if (ethereumAmount > 0) {
      const newEthereumAmount = ethereumAmount - 0.0003;
      setEthereumAmount(newEthereumAmount);
      setXpAmount(xpAmount-1);
      setConvertedValue(newEthereumAmount.toFixed(4));
    }
  };

  

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: string[]) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
          getAccountBalance(result[0]);
        })
        .catch((error: { message: string }) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  connectWalletHandler();

  const accountChangedHandler = (newAccount: string) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount);
  };

  const getAccountBalance = (account: string) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance: string) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error: { message: string }) => {
        setErrorMessage(error.message);
      });
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  const increaseXp = async() => {
    const response = await axios.post(`http://127.0.0.1:8000/update_user`, {username:'hamdan27' ,compassxp_points: xpAmount });
  }

  const sendEthHandler = async () => {
    if (window.ethereum && defaultAccount && convertedValue) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      try {
        const tx = await signer.sendTransaction({
          to: defaultAccount,
          value: ethers.utils.parseEther(convertedValue),
        });
        setTransactionAmount(convertedValue);
        console.log(tx);
        increaseXp();
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage(
        "Please connect your wallet first or enter a valid amount."
      );
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountChangedHandler);
      window.ethereum.on("chainChanged", chainChangedHandler);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            "accountsChanged",
            accountChangedHandler
          );
          window.ethereum.removeListener("chainChanged", chainChangedHandler);
        }
      };
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };


  return (
    <Card className="w-full max-w-md mx-auto mt-8 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <CardHeader className="mb-4">
        <CardTitle className="text-2xl font-semibold">Convert Ethereum to Compass XP</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="ethereum-amount" className="font-medium">Compass Xp Amount</Label>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleDecreaseEthereum} className="bg-gray-800 text-gray-400 hover:text-gray-50">
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium">{xpAmount}</span>
              <Button variant="ghost" size="icon" onClick={handleIncreaseEthereum} className="bg-gray-800 text-gray-400 hover:text-gray-50">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <Button onClick={sendEthHandler} className="bg-blue-600 hover:bg-blue-700 text-white">
          Purchase
        </Button>
        <div className="flex items-center justify-between mt-4">
          <div className="font-medium">Price:</div>
          <div className="text-2xl font-semibold">{ethereumAmount.toFixed(4)} ETH</div>
        </div>
      </CardContent>
    </Card>
  );
}


function MinusIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}


function PlusIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}