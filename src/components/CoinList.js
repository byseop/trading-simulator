import React, { useCallback } from 'react';
import '../css/CoinList.css';
import { useExchangeState } from '../context/ExchangeContext';
import Coin from '../components/Coin';

const CoinList = () => {
  const state = useExchangeState();
  const { data: markets } = state.market;
  const { data: realtimeData } = state.realtimeData;

  // 거래량 순으로 정렬하기
  const sortedData = useCallback(() => {
    return (
      realtimeData &&
      realtimeData.sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h)
    );
  }, [realtimeData]);

  // console.log('[CoinList.js] -> rendered');

  return (
    <div className="Coin__List">
      <div className="List__Head">
        <div className="Coin__Name">
          <span>한글명</span>
        </div>
        <div className="Coin__Price">
          <span>현재가</span>
        </div>
        <div className="Coin__Change__Price">
          <span>전일대비</span>
        </div>
        <div className="Coin__Volume">
          <span>거래대금</span>
        </div>
      </div>
      <div className="Coins">
        {sortedData() &&
          sortedData().map(data => (
            <Coin
              key={data.code}
              data={data}
              name={
                markets.filter(list => list.market === data.code)[0].korean_name
              }
            />
          ))}
      </div>
    </div>
  );
};

export default React.memo(CoinList);
