import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

/// 실시간 정보
// StockExchange 에서 사용 할 기본상태
const initialState = {
  market: {
    isLoad: false,
    data: null,
    error: null,
  },
  realtimeData: {
    isLoad: false,
    data: null,
    error: null,
  },
};

// 로딩중 상태
const loadingState = {
  isLoad: true,
  data: null,
  error: null,
};

// 성공시 상태
const success = data => ({
  isLoad: false,
  data,
  error: null,
});

// 실패시 상태
const error = error => ({
  isLoad: false,
  data: null,
  error: error,
});

// 실시간 정보 저장
const saveRealtimeData = (realtimeData, data) => ({
  isLoad: false,
  data: (function() {
    // console.log(realtimeData.data)
    if (realtimeData.data) {
      if (!realtimeData.data.map(list => list.code).includes(data.code)) {
        return realtimeData.data.concat(data);
      } else {
        return realtimeData.data
          .filter(list => list.code !== data.code)
          .concat(data);
      }
    } else {
      const tempArr = [];
      realtimeData.data = tempArr.concat(data);
      return realtimeData.data;
    }
  })(),
  error: null,
});

// 리듀서
function ExchangeReducer(state, action) {
  switch (action.type) {
    case 'GET_MARKET':
      return {
        ...state,
        market: loadingState,
      };
    case 'GET_MARKET_SUCCESS':
      return {
        ...state,
        market: success(action.data),
      };
    case 'GET_MARKET_ERROR':
      return {
        ...state,
        market: error(action.error),
      };
    case 'GET_REALTIME_DATA':
      return {
        ...state,
        realtimeData: loadingState,
      };
    case 'GET_REALTIME_DATA_SUCCESS':
      return {
        ...state,
        realtimeData: saveRealtimeData(state.realtimeData, action.data),
      };
    case 'GET_REALTIME_DATA_ERROR':
      return {
        ...state,
        realtimeData: error(action.error),
      };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

// 컨텍스트 분리
const ExchangeStateContext = createContext(null);
const ExchangeDispatchContext = createContext(null);
// 위에서 선언한 두가지 컨텍스트를 Provider로 감싸준다.
export function ExchangeProvider({ children }) {
  const [state, dispatch] = useReducer(ExchangeReducer, initialState);
  return (
    <ExchangeStateContext.Provider value={state}>
      <ExchangeDispatchContext.Provider value={dispatch}>
        {children}
      </ExchangeDispatchContext.Provider>
    </ExchangeStateContext.Provider>
  );
}

// Hook: 조회를 쉽게
export function useExchangeState() {
  const state = useContext(ExchangeStateContext);
  if (!state) {
    throw new Error('Cannot find Stock Provider');
  }
  return state;
}

export function useExchangeDispatch() {
  const dispatch = useContext(ExchangeDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find Stock Provider');
  }
  return dispatch;
}

// 실시간 시세 조회 함수
export async function getMarket(dispatch) {
  dispatch({
    // 마켓 가져오기 시작
    type: 'GET_MARKET',
  });
  try {
    // 마켓 가져오기 중
    const response = await axios.get('https://api.upbit.com/v1/market/all');
    dispatch({
      type: 'GET_MARKET_SUCCESS',
      data: response.data,
    });

    // 마켓 리스트를 추출하여 웹소켓 실행
    const marketList = response.data
      .filter(list => list.market.includes('KRW-'))
      .map(list => list.market);
    const ws = new WebSocket('wss://api.upbit.com/websocket/v1');
    ws.onopen = () => {
      // 웹소켓 연결
      dispatch({
        type: 'GET_REALTIME_DATA',
      });
      ws.send(
        `[{"ticket":"test"},{"type":"ticker","codes": ${JSON.stringify(
          marketList,
        )}}]`,
      );
    };
    ws.onmessage = async e => {
      // 실시간 데이터 수신
      const { data } = e;
      const text = await new Response(data).text();
      // console.log(JSON.parse(text));
      dispatch({
        type: 'GET_REALTIME_DATA_SUCCESS',
        data: JSON.parse(text),
      });
    };
    ws.onerror = e => {
      // 실시간 데이터 수신 에러
      dispatch({
        type: 'GET_REALTIME_DATA_ERROR',
        error: e,
      });
    };
  } catch (e) {
    // 마켓 가져오기 실패
    dispatch({
      type: 'GET_MARKET_ERROR',
      error: e,
    });
  }
}

/// 요약정보
const summaryState = {
  code: null,
  name: null,
};

function summaryReducer(state, action) {
  switch (action.type) {
    case 'SELECT_COIN':
      return {
        code: action.code,
        name: action.name,
      };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

// 선택 된 코인 컨텍스트
const summaryStateContext = createContext(null);
const summaryDispatchContext = createContext(null);
export function SummaryProvider({ children }) {
  const [state, dispatch] = useReducer(summaryReducer, summaryState);
  return (
    <summaryStateContext.Provider value={state}>
      <summaryDispatchContext.Provider value={dispatch}>
        {children}
      </summaryDispatchContext.Provider>
    </summaryStateContext.Provider>
  );
}

export function useSummaryState() {
  const state = useContext(summaryStateContext);
  if (!state) {
    throw new Error('Cannot find Summary Provider');
  }
  return state;
}

export function useSummaryDispatch() {
  const dispatch = useContext(summaryDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find Summary Provider');
  }
  return dispatch;
}

/// 유저 정보
// 유저 기본정보
const userData = {
  cash: null,
  coin: null,
};

// fn ASK
const fnAsk = (coin, askCoin) => {
  if (!coin) {
    return [askCoin];
  } else {
    const exist = coin.filter(list => list.code === askCoin.code);
    if (exist.length) {
      return coin.map(list => {
        if (list.code === askCoin.code) {
          list.totalPrice += askCoin.totalPrice;
          list.volume += askCoin.volume;
          return list;
        } else {
          return list;
        }
      });
    } else {
      return coin.concat(askCoin);
    }
  }
};

// fn BID
const fnBid = (state, bidCoin) => {
  const holdingCoin =
    state.coin && state.coin.filter(list => list.code === bidCoin.code)[0];

  if (holdingCoin) {
    if (holdingCoin.volume < bidCoin.volume) {
      // 보유중인 코인의 수량보다 판매요청한 수량이 많을 때
      alert(`보유중인 ${bidCoin.code}이(가) 요청 수량보다 적습니다.`);
      return {
        cash: state.cash,
        coin: state.coin,
      };
    } else {
      return {
        cash: (state.cash += bidCoin.totalPrice),
        coin: state.coin.reduce((acc, cur) => {
          if (cur.code === bidCoin.code) {
            if (cur.volume !== bidCoin.volume) {
              cur.volume -= bidCoin.volume;
              cur.totalPrice -= bidCoin.totalPrice;
              acc.push(cur);
            }
          } else {
            acc.push(cur);
          }
          return acc;
        }, []),
      };
    }
  } else {
    alert(`보유중인 ${bidCoin.code}이(가) 없습니다.`);
    return {
      cash: state.cash,
      coin: null,
    };
  }
};

// 유저 리듀서
function userReducer(state, action) {
  switch (action.type) {
    case 'USER_REGISTER':
      return {
        ...state,
        cash: action.data.cash,
      };
    case 'TRADE_ASK':
      if (state.cash < action.data.coin.totalPrice) {
        alert('보유 현금이 부족합니다.');
        return { ...state };
      } else {
        return {
          ...state,
          cash: state.cash - action.data.coin.totalPrice,
          coin: fnAsk(state.coin, action.data.coin),
        };
      }
    case 'TRADE_BID':
      return fnBid(state, action.data.coin);
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

// 유저 컨텍스트
const userStateContext = createContext(null);
const userDispatchContext = createContext(null);
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, userData);
  return (
    <userStateContext.Provider value={state}>
      <userDispatchContext.Provider value={dispatch}>
        {children}
      </userDispatchContext.Provider>
    </userStateContext.Provider>
  );
}

// Hook: 유저 컨텍스트
export function useUserState() {
  const state = useContext(userStateContext);
  if (!state) {
    throw new Error('Cannot find User Provider');
  }
  return state;
}

export function useUserDispatch() {
  const dispatch = useContext(userDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find User Provider');
  }
  return dispatch;
}

// 실시간 호가 데이터
const orderbook = {
  isLoad: null,
  data: null,
  error: null,
};

// 실시간 호가 리듀서
function OrderbookReducer(state, action) {
  switch (action.type) {
    case 'GET_ORDERBOOK':
      return loadingState;
    case 'GET_ORDERBOOK_SUCCESS':
      return success(action.data);
    case 'GET_ORDERBOOK_ERROR':
      return error(action.error);
    case 'CLOSE_ORDERBOOK':
      return {
        isLoad: null,
        data: null,
        error: null,
      };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

// 실시간 호가 컨텍스트
const OrderbookStateContext = createContext(null);
const OrderbookDispatchContext = createContext(null);

export function OrderbookProvider({ children }) {
  const [state, dispatch] = useReducer(OrderbookReducer, orderbook);
  return (
    <OrderbookStateContext.Provider value={state}>
      <OrderbookDispatchContext.Provider value={dispatch}>
        {children}
      </OrderbookDispatchContext.Provider>
    </OrderbookStateContext.Provider>
  );
}

// Hook
export function useOrderbookState() {
  const state = useContext(OrderbookStateContext);
  if (!state) {
    throw new Error(`Cannot find Orderbook Provider`);
  }
  return state;
}

export function useOrderbookDispatch() {
  const dispatch = useContext(OrderbookDispatchContext);
  if (!dispatch) {
    throw new Error(`Cannot find Orderbook Provider`);
  }
  return dispatch;
}

// 실시간 호가 조회 함수
const getOrderbook = (function() {
  let ws;
  return {
    wsopen: (dispatch, code) => {
      try {
        // 변경 된 마켓코드 설정
        const marketCode = code;

        // 웹소켓 생성
        ws = new WebSocket('wss://api.upbit.com/websocket/v1');
        ws.onopen = () => {
          dispatch({
            type: 'GET_ORDERBOOK',
          });
          ws.send(
            `[{"ticket":"UNIQUE_TICKET"},{"type":"orderbook","codes":["${marketCode}"]}]`,
          );
        };

        // 실시간 호가 수신
        ws.onmessage = async e => {
          const { data } = e;
          const text = await new Response(data).text();

          dispatch({
            type: 'GET_ORDERBOOK_SUCCESS',
            data: JSON.parse(text),
          });
        };

        // 실시간 호가 수신 에러
        ws.onerror = e => {
          dispatch({
            type: 'GET_ORDERBOOK_ERROR',
            error: e,
          });
        };
      } catch (e) {
        throw new Error(`Error -> ${e}`);
      }
    },
    wsclose: dispatch => {
      if (ws !== null) {
        dispatch({
          type: 'CLOSE_ORDERBOOK',
        });
        ws.close();
      }
    },
  };
})();
export { getOrderbook };
