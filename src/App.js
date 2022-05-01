import React, { useEffect, useState } from "react";
//import * as React from "react";
//import { ethers } from "ethers";
import './App.css';

const App = () => {
  /* ユーザーのパブリックウォレットを保存するために使用する状態変数を定義します */
  const [currentAccount, setCurrentAccount] = useState("");
  console.log("currentAccount: ", currentAccount);

  /* window.ethereumにアクセスできることを確認します */
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if(!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      /* ユーザーのウォレットへのアクセスが許可されているかどうかを確認します */
      const accounts = await ethereum.request({ method: "eth_accounts"});
      if(accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // connectWalletメソッドを実装
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if(!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  /* Webページがロードされたときに下記の関数を実行します */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
      <div className="mainContainer">
        <div className="dataContainer">
          <div className="header">
          <span role="img" aria-label="hand-wave">👋</span>{" "} WELCOME!
          </div>

          <div className="bio">
          イーサリアムウォレットを接続して、メッセージを作成したら、<span role="img" aria-label="hand-wave">👋</span>を送ってください<span role="img" aria-label="shine">✨</span>
          </div>

          <button className="waveButton" onClick={null}>
          Wave at Me
          </button>
          {/*ウォレットコネクトのボタンを実装 */}
          {!currentAccount && (
            <button className="waveButton" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
          {currentAccount && (
            <button className="waveButton" onClick={connectWallet}>
              Wallet Connected
            </button>
          )}
        </div>
      </div>
  );
};
export default App;
