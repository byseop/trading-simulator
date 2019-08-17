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
  const { data } = state.realtimeData;
  console.log(data)

  useEffect(() => {
    getMarket(dispatch);
  }, [dispatch]);

  if (isLoad) return <div>로딩중</div>;
  if (error) return <div>에러발생</div>;
  // if (!markets) return <button onClick={fetchMarketData}>불러오기</button>;

  // console.log(state)
  return (
    <div>
      {data && data.map(list => <div>{list.code}: {list.trade_price}</div>)}
      {/* {markets && markets.map(market => <div>{market.korean_name}</div>)} */}
    </div>
  );
}

export default StockExchange;
