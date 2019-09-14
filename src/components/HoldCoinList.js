import React from 'react';
import '../css/HoldCoinList.css';
import { useExchangeState, useUserState } from '../context/ExchangeContext';
import HoldCoin from './HoldCoin';

const HoldCoinList = () => {
  const marketState = useExchangeState();
  const { data: markets } = marketState.market;

  const userState = useUserState();
  // console.log(userState);

  return (
    <div className="Hold__Coin__List">
      <div className="List__Head">
        <div className="Coin__Name">
          <span>코인명</span>
        </div>
        <div className="Coin__Price">
          <span>평가금/보유량</span>
        </div>
        <div className="Coin__Change__Price">
          <span>수익률</span>
        </div>
        <div className="Coin__Average">
          <span>매수가/평균가</span>
        </div>
      </div>
      <div className="Coins">
        {!userState.coin ? (
          <p className="not-hold">보유중인 코인이 없습니다.</p>
        ) : (
          userState.coin.map(list => (
            <HoldCoin
              data={list}
              key={list.fullcode}
              name={
                markets.filter(market => market.market === list.fullcode)[0]
                  .korean_name
              }
              realtimePrice={
                marketState.realtimeData.data.filter(
                  data => data.code === list.fullcode,
                )[0].trade_price
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HoldCoinList;
