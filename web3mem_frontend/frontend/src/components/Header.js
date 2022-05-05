import React from "react";

import "../styles/Header.css";
import logo from "../assets/logo.svg";

const Header = ({ currentAccount, connectWallet }) => {
  return (
    <header className="header">
      <a href="#" className="header__logoLink">
        <img src={logo} className="header__logo"></img>
      </a>
      {!currentAccount ? (
        <button onClick={connectWallet} className="btn btn--header">
          Connect Wallet
        </button>
      ) : (
        <button className="btn btn--header">Meme Collection</button>
      )}
    </header>
  );
};

export default Header;
