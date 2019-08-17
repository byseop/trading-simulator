import React from 'react';
import '../css/CoinList.css';
import { useExchangeState } from '../context/ExchangeContext';
import Coin from '../components/Coin';

const CoinList = () => {
  const state = useExchangeState();
  const { data: markets } = state.market;
  const { data: realtimeData } = state.realtimeData;

  // 거래량 순으로 정렬하기
  const sortedData =
    realtimeData &&
    realtimeData.sort((a, b) =>
      a.acc_trade_price < b.acc_trade_price
        ? 1
        : a.acc_trade_price > b.acc_trade_price
        ? -1
        : 0,
    );

  return (
    <div className="Coin__List">
      {sortedData &&
        sortedData.map(data => <Coin key={data.code} data={data} />)}
    </div>
  );
};

export default React.memo(CoinList);
