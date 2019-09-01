import React, { useState } from 'react';
import '../css/Trade.css';
import TradeForm from './TradeForm';

const Trade = ({ orderbookData, code }) => {
  const [type, setType] = useState('ASK'); // 'ASK: 매도' <-> 'BID: 매도'

  return (
    <div className="Trade__Box">
      <div className="Trade__Head">
        <div className="Trade__Method">
          <p
            className={type === 'ASK' ? 'on' : null}
            onClick={() => setType('ASK')}
          >
            매수
          </p>
        </div>
        <div className="Trade__Method">
          <p
            className={type === 'BID' ? 'on' : null}
            onClick={() => setType('BID')}
          >
            매도
          </p>
        </div>
      </div>
      <TradeForm type={type} orderbookData={orderbookData} code={code} />
    </div>
  );
};

export default Trade;
