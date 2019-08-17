import React, { useEffect } from 'react';
import {
  getMarket,
  useExchangeDispatch,
} from '../context/ExchangeContext';
import CoinDetail from './CoinDetail';
import CoinList from './CoinList';
import '../css/TradingSimulator.css';

function TradingSimulaor() {
  const dispatch = useExchangeDispatch();

  useEffect(() => {
    getMarket(dispatch);
  }, [dispatch]);

  return (
    <div className="Trading__Simulator">
      <CoinDetail />
      <CoinList />
    </div>
  );
}

export default TradingSimulaor;
