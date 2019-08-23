import React from 'react';
import '../css/HoldCoinList.css';
import HoldCoin from './HoldCoin';

const HoldCoinList = () => {
  return (
    <div className="Hold__Coin__List">
      <div className="List__Head">
        <div className="Coin__Name">
          <span>코인명</span>
        </div>
        <div className="Coin__Price">
          <span>보유(평가금)</span>
        </div>
        <div className="Coin__Change__Price">
          <span>매수평균가</span>
        </div>
        <div className="Coin__Volume">
          <span>수익률</span>
        </div>
      </div>
      <div className="Coins">
        <HoldCoin />
      </div>
    </div>
  );
};

export default HoldCoinList;
