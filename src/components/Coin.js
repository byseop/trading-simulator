import React, { useCallback } from 'react';
import { useSummaryDispatch } from '../context/ExchangeContext';
import '../css/Coin.css';

const Coin = ({ data, name }) => {
  const dispatch = useSummaryDispatch();
  const selectCoin = useCallback(() => {
    dispatch({
      type: 'SELECT_COIN',
      name,
      data
    });
  }, [data, dispatch, name]);

  // console.log('rendered');
  const {
    code,
    trade_price,
    change_rate,
    acc_trade_price_24h,
    change,
    change_price,
  } = data;
  const changeLiteral = () => {
    if (change === 'RISE') {
      return '+';
    } else if (change === 'FALL') {
      return '-';
    }
    return '';
  };
  return (
    <div className="Coin" onClick={selectCoin}>
      <div className="Coin__Name">
        <p>{name}</p>
        <span>{code}</span>
      </div>
      <div className={`Coin__Price ${change}`}>
        <p>{trade_price.toLocaleString()}</p>
      </div>
      <div className={`Coin__Change__Price ${change}`}>
        <p>{`${changeLiteral()} ${(change_rate * 100).toFixed(2)}%`}</p>
        <span>{`${changeLiteral()} ${change_price.toLocaleString()}`}</span>
      </div>
      <div className="Coin__Volume">
        <p>{(acc_trade_price_24h * 0.000001).toFixed(0).toLocaleString()}백만</p>
      </div>
    </div>
  );
};

export default React.memo(Coin);
