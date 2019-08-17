import React, { useEffect } from 'react';
import {
  getMarket,
  useExchangeState,
  useExchangeDispatch,
} from '../context/ExchangeContext';

function TradingSimulaor() {
  const state = useExchangeState();
  const dispatch = useExchangeDispatch();
  const { isLoad, error, data: markets } = state.market;
  const { data } = state.realtimeData;

  useEffect(() => {
    getMarket(dispatch);
  }, [dispatch]);

  if (isLoad) return <div>로딩중</div>;
  if (error) return <div>에러발생</div>;
  // if (!markets) return <button onClick={fetchMarketData}>불러오기</button>;

  // console.log(state)
  return (
    <div>
      {data &&
        data.map(list => (
          <div>
            {list.code}: {list.trade_price}
          </div>
        ))}
      {/* {markets && markets.map(market => <div>{market.korean_name}</div>)} */}
    </div>
  );
}

export default TradingSimulaor;
