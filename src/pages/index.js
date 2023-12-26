// pages/index.js
import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [coins, setCoins] = useState([]);

  // Fetch coins data from API
  const fetchCoins = () => {
    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => res.json())
      .then((data) => {
        const mappedCoins = data.coins.map((coin) => ({
          name: coin.item.name,
          symbol: coin.item.symbol,
          price: coin.item.price_btc,
          logo: coin.item.large,
        }));
        setCoins(mappedCoins); // Update the coins array
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // Fetch coins data when component is mounted
    fetchCoins();
  }, []);

  return (
    <div>
      <h1>Trending</h1>
      <div className="container">
        {coins.map((coin) => (
          <div key={coin.name} className="coin-row">
            <img src={coin.logo} alt={coin.name} className="coin-logo" />
            <div className="coin-details">
              <h2>{coin.name}</h2>
              <p>{coin.symbol}</p>
              <p>{coin.price} BTC</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
