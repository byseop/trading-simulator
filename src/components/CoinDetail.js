import React from 'react';
import '../css/CoinDetail.css';
import { useSummaryState } from '../context/ExchangeContext';
import CoinSummary from './CoinSummary';
import OrderContainer from './OrderContainer';

const CoinDetail = () => {
  const state = useSummaryState();
  const { code, name } = state;
  return (
    <div className="Coin__Detail">
      <CoinSummary code={code} name={name} />
      <OrderContainer code={code} />
    </div>
  );
};

export default CoinDetail;
