import React from 'react';
import '../css/Coin.css';

const Coin = ({ data, name }) => {
  const { code, trade_price, change_rate, acc_trade_price_24h } = data;
  return (
    <div className="Coin">
      <div className="Coin__Name"><p>{name}</p></div>
      <div className="Coin__Price"><p>{trade_price.toLocaleString()}</p></div>
      <div className="Coin__Change__Price"><p>{(change_rate*100).toFixed(2)}</p></div>
      <div className="Coin__Volume"><p>{(acc_trade_price_24h*0.000001).toFixed(0)}백만</p></div>
    </div>
  );
};

export default React.memo(Coin);
