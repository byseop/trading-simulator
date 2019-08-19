import React, { useCallback } from 'react';
import '../css/CoinSummary.css';
import { useSummaryState } from '../context/ExchangeContext';

const CoinSummary = () => {
  const state = useSummaryState();
  const { name, data } = state;

  const changeLiteral = useCallback(() => {
    if (data && data.change === 'RISE') {
      return '+';
    } else if (data && data.change === 'FALL') {
      return '-';
    }
    return '';
  }, [data]);

  if (data) {
    const {
      code,
      change,
      trade_price,
      change_rate,
      change_price,
      high_price,
      low_price,
      acc_trade_price_24h,
      acc_trade_volume_24h
    } = data;

    return (
      <div className="Coin__Summary">
        <div className="Selected">
          <div className="Name">
            <h3
              style={{
                backgroundImage: `url(https://static.upbit.com/logos/${
                  code.split('-')[1]
                }.png)`,
              }}
            >
              {name}
              <span>{code}</span>
            </h3>
          </div>
          <div className="Info">
            <div className={`Price ${change}`}>
              <h4>
                {trade_price.toLocaleString()}
                <span>{code.split('-')[0]}</span>
              </h4>
              <div className="Change">
                <p>
                  전일대비:{' '}
                  <span>
                    {changeLiteral()}
                    {(change_rate * 100).toFixed(2)}%
                  </span>
                  <span>
                    {changeLiteral()}
                    {change_price.toLocaleString()}
                    <em>{code.split('-')[0]}</em>
                  </span>
                </p>
              </div>
            </div>
            <div className="Others">
              <div className="High__Low">
                <p>
                  고가<span>{parseInt(high_price.toFixed(0)).toLocaleString()}<em>{code.split('-')[0]}</em></span>
                </p>
                <p>
                  저가<span>{parseInt(low_price.toFixed(0)).toLocaleString()}<em>{code.split('-')[0]}</em></span>
                </p>
              </div>
              <div className="Volume">
                <p>
                  거래량(24H)<span>{parseInt(acc_trade_volume_24h.toFixed(0)).toLocaleString()}<em>{code.split('-')[1]}</em></span>
                </p>
                <p>
                  거래대금(24H)<span>{parseInt(acc_trade_price_24h.toFixed(0)).toLocaleString()}<em>{code.split('-')[0]}</em></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div className="Select__Coin__Loading">오른쪽에서 선택해주세요.</div>;
};

export default React.memo(CoinSummary);
