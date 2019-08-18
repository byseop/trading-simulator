import React from 'react';
import '../css/CoinSummary.css';
import { useSummaryState } from '../context/ExchangeContext';

const CoinSummary = () => {
  const state = useSummaryState();
  const { name, data } = state;
  console.log(state)
  return (
    <div className="Coin__Summary">
      <div>{name && name}</div>
      <div>{data && data.trade_price}</div>
    </div>
  );
};

export default CoinSummary;
