import React, { useCallback } from 'react';
import { useSummaryDispatch } from '../context/ExchangeContext';
import '../css/Coin.css';

const Coin = ({ data, name }) => {
  const dispatch = useSummaryDispatch();
  const selectCoin = useCallback(() => {
    dispatch({
      type: 'SELECT_COIN',
      code: data.code,
      name
    });
  }, [data.code, dispatch, name]);

  // console.log('rendered coin');
  const {
    code,
    trade_price,
    change_rate,
    acc_trade_price_24h,
    change,
    change_price,
  } = data;

  const changeLiteral = useCallback(change => {
    if (change === 'RISE') {
      return '+';
    } else if (change === 'FALL') {
      return '-';
    }
    return '';
  }, []);

  const fixPrice = useCallback(price => {
    // 가격 단위 조정 함수
    return parseInt(price.toFixed(0)).toLocaleString();
  }, []);

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
        <p>{`${changeLiteral(change)} ${(change_rate * 100).toFixed(2)}%`}</p>
        <span>{`${changeLiteral(
          change,
        )} ${fixPrice(change_price)}`}</span>
      </div>
      <div className="Coin__Volume">
        <p>
          {parseInt(
            (acc_trade_price_24h * 0.000001).toFixed(0),
          ).toLocaleString()}
          백만
        </p>
      </div>
    </div>
  );
};

export default React.memo(Coin);
