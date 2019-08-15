import React, { useEffect } from 'react';
import {
  getMarket,
  useStockState,
  useStockDispatch,
} from '../context/StockExchangeContext';

function StockExchange() {
  const state = useStockState();
  const dispatch = useStockDispatch();
  const { isLoad, error, data: markets } = state.market;

  useEffect(() => {
    getMarket(dispatch);
  }, [dispatch])

  if (isLoad) return <div>로딩중</div>;
  if (error) return <div>에러발생</div>;
  // if (!markets) return <button onClick={fetchMarketData}>불러오기</button>;
  return (
    <div>
      {markets && markets.map(market => (
        <div>{market.korean_name}</div>
      ))}
    </div>
  );
}

export default StockExchange;
