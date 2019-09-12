import React from 'react';
import '../css/Coin.css';

const HoldCoin = ({ data, name, realtimePrice }) => {
  const { fullcode, totalPrice, volume } = data;
  const average = parseFloat((totalPrice / data.volume).toFixed(2));
  const earnReturn = ((realtimePrice - average) / realtimePrice) * 100;
  const est = volume * realtimePrice;
  return (
    <div className="Hold__Coin Coin">
      <div className="Coin__Name">
        <p>{name}</p>
        <span>{fullcode}</span>
      </div>
      <div
        className={`Coin__Price ${
          realtimePrice === average
            ? ''
            : realtimePrice > average
            ? 'RISE'
            : 'FALL'
        }`}
      >
        <p>{est.toLocaleString()}</p>
      </div>
      <div
        className={`Coin__Change__Price ${
          earnReturn === 0 ? '' : earnReturn > 0 ? 'RISE' : 'FALL'
        }`}
      >
        <p>{earnReturn.toFixed(2)}%</p>
      </div>
      <div className="Coin__Average">
        <p>{average.toLocaleString()}</p>
      </div>
    </div>
  );
};
export default React.memo(HoldCoin);
