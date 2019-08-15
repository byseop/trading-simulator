import React, { useEffect } from 'react';
import {
  getMarket,
  getCoin,
  useStockState,
  useStockDispatch,
} from '../context/StockExchangeContext';

function StockExchange() {
  const state = useStockState();
  const dispatch = useStockDispatch();
  const { isLoad, error, data: markets } = state.market;

  useEffect(() => {
    getMarket(dispatch);
  }, [dispatch]);

  const createWebsocket = () => {
    getCoin(state, dispatch)
    const codeArr = state.coin.data;
    if (codeArr) {
      const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
      ws.onopen = () => {
        ws.send(`[{"ticket":"test"},{"type":"ticker","codes": ${JSON.stringify(codeArr)}}]`);
      };
      ws.onmessage = async e => {
        const { data } = e;
        const text = await (new Response(data).text());
        console.log(JSON.parse(text));
      } 
    }
  }

  if (isLoad) return <div>로딩중</div>;
  if (error) return <div>에러발생</div>;
  // if (!markets) return <button onClick={fetchMarketData}>불러오기</button>;
  return (
    <div>
      <button onClick={createWebsocket}>웹소켓 실행</button>
      {markets && markets.map(market => <div>{market.korean_name}</div>)}
    </div>
  );
}

export default StockExchange;
