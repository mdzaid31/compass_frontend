'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ethers } from 'ethers'
import Component from './convertor';
import axios from 'axios';

declare global {
    interface Window {
        ethereum: any;
    }
}

export default function Navbar() {
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


    const [open, setOpen] = React.useState(false);
    const [formOpen, setFormOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const [userData, setUserData] = useState([]); 

    const openForm = () => {
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
    };

    const username = 'hamdan27';

    const info = async() => {
        const response = await axios.get(`http://127.0.0.1:8000/users/${username}`);
        setUserData(response.data); 
    }

    info();


    console.log('USer Data',userData);

    
    

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

    const handleConversion = () => {
        const number = parseFloat(inputValue);
        if (!isNaN(number)) {
            // Assume a conversion rate of 0.0001 Ether per unit
            const conversionRate = 0.0001;
            const etherValue = number * conversionRate;
            setConvertedValue(etherValue.toFixed(4)); // Limit to 4 decimal places
        } else {
            setConvertedValue(null);
        }
    };
    return (
        <header className="flex h-16 w-full items-center justify-between bg-gray-950 px-4 md:px-6">
            <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center text-white gap-2" prefetch={false}>
                    <Image src='/compass_logo.png' width={20} height={20} alt="Compass XP" />
                    <span>Compass XP</span>
                </Link>
                <Link href="/twitch" className="text-gray-400 hover:text-gray-50" prefetch={false}>
                    Twitch
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-50" prefetch={false}>
                    Events
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-50" prefetch={false}>
                    Players
                </Link>
            </div>
            {connButtonText === 'Wallet Connected' ? (
                <div className="flex items-center gap-2">
                    <Button onClick={openForm} variant="ghost" className="rounded-full bg-gray-800 px-4 py-2 text-gray-400 hover:text-gray-50">
                        <Image src='/compass-xp.png' width={20} height={20} alt="Compass XP" />
                        {userData?.compassxp_points}
                    </Button>
                    <Button variant="ghost" className="rounded-full bg-gray-800 px-4 py-2 text-gray-400 hover:text-gray-50">
                        {userBalance} ETH
                    </Button>
                    <Button variant="ghost" className="rounded-full bg-gray-800 px-4 py-2 text-gray-400 hover:text-gray-50">
                        {userData?.fullname}
                    </Button>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Button onClick={connectWalletHandler} variant="ghost" className="rounded-full bg-gray-800 px-4 py-2 text-gray-400 hover:text-gray-50">
                        {connButtonText}
                    </Button>
                </div>
            )}

            {formOpen && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                    <Component setOpen={setFormOpen} />
                </div>
            )}
            {/* <div className="flex items-center gap-2">
        <Button variant="ghost" className="rounded-full bg-gray-800 px-4 py-2 text-gray-400 hover:text-gray-50">
          Login / Signup
        </Button>
      </div> */}
        </header>
    )
}
