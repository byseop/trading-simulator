import React from 'react';
import '../css/Coin.css';

const HoldCoin = () => {
  return (
    <div className="Hold__Coin Coin">
      <div className="Coin__Name">
        <p>비트코인</p>
        <span>KRW-BTC</span>
      </div>
      <div className="RISE">
        <p>12,199,900</p>
      </div>
      <div className="Coin__Change__Price">
        <p>1%</p>
        <span>+10,000</span>
      </div>
      <div className="Coin__Volume">
        <p>
          100,000
          백만
        </p>
      </div>
    </div>
  );
};
export default HoldCoin;
