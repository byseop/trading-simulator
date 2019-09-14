import React, { useCallback, useEffect, useState } from 'react';
import Cleave from 'cleave.js/react';
import { useUserState, useUserDispatch } from '../context/ExchangeContext';

const TradeForm = ({ type, orderbookData, code }) => {
  const typeToStr = useCallback(() => {
    if (type === 'ASK') {
      return '매수';
    } else if (type === 'BID') {
      return '매도';
    }
  }, [type]);

  const [inputPrice, setInputPrice] = useState(0); // 매수가격
  const [inputVolume, setInputVolume] = useState(0); // 매수수량

  useEffect(() => {
    // 왼쪽 호가창에서 가격 선택시 매수가격 수정
    const price = orderbookData.ask_price || orderbookData.bid_price || 0;
    setInputPrice(price);
  }, [orderbookData]);

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(inputPrice * inputVolume);
  }, [inputPrice, inputVolume]);

  const fnCodeStr = useCallback(
    type => {
      if (code) {
        return code.split('-')[type];
      }
    },
    [code],
  );

  const userState = useUserState();
  const userDispatch = useUserDispatch();

  const { cash } = userState;
  // console.log(userState);
  const trade = useCallback(() => {
    if (type === 'ASK') {
      userDispatch({
        type: 'TRADE_ASK',
        data: {
          coin: {
            totalPrice: totalPrice,
            code: fnCodeStr(1),
            fullcode: code,
            volume: inputVolume,
          },
        },
      });
    } else if (type === 'BID') {
      userDispatch({
        type: 'TRADE_BID',
        data: {
          coin: {
            totalPrice: totalPrice,
            code: fnCodeStr(1),
            fullcode: code,
            volume: inputVolume,
          },
        },
      });
    } else throw new Error(`Unhandled trade type ${type}`);
    setInputPrice(0);
    setInputVolume(0);
  }, [userDispatch, type, totalPrice, inputVolume, fnCodeStr, code]);

  const askAlert = useCallback(() => {
    alert('왼쪽 호가창에서 가격을 선택해주세요.');
  }, []);

  return (
    <div className="Trade__Form">
      <div className="Form__List">
        <div className="Form__Title">
          <p>보유 원화</p>
        </div>
        <div className="Form__Des">
          <p>
            {cash && cash.toLocaleString()}
            <span>{fnCodeStr(0)}</span>
          </p>
        </div>
      </div>
      <div className="Form__List">
        <div className="Form__Title">
          <p>{typeToStr()} 가격</p>
        </div>
        <div className="Form__Des">
          <Cleave
            options={{
              numeral: true,
              numeralThousandsGroupStyle: 'thousand',
            }}
            value={inputPrice}
            onChange={e => setInputPrice(Number(e.target.rawValue))}
            readOnly
            onClick={askAlert}
          />
          <label>{fnCodeStr(0)}</label>
        </div>
      </div>
      <div className="Form__List">
        <div className="Form__Title">
          <p>{typeToStr()} 수량</p>
        </div>
        <div className="Form__Des">
          <Cleave
            options={{
              numeral: true,
              numeralThousandsGroupStyle: 'thousand',
            }}
            value={inputVolume}
            onChange={e => setInputVolume(Number(e.target.rawValue))}
          />
          <label>{fnCodeStr(1)}</label>
        </div>
      </div>
      <div className="Form__List">
        <div className="Form__Title">
          <p>{typeToStr()} 총액</p>
        </div>
        <div className="Form__Des">
          <p>
            {totalPrice.toLocaleString()}
            <span>{fnCodeStr(0)}</span>
          </p>
        </div>
      </div>
      <div className="Form__Submit">
        <button
          type="submit"
          style={{ backgroundColor: type === 'ASK' ? '#f14f4f' : '#7878e3' }}
          onClick={trade}
        >
          {typeToStr()}
        </button>
      </div>
    </div>
  );
};

export default React.memo(TradeForm);
