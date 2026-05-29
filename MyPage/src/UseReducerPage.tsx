import { useState, useReducer } from 'react';

interface IState {
  counter: number;
}

type TAction =
  | { type: 'INCREASE'; payload?: number }
  | { type: 'DECREASE' }
  | { type: 'RESET_TO_ZERO' };

const initialState: IState = {
  counter: 0,
};

function reducer(state: IState, action: TAction): IState {
  switch (action.type) {
    case 'INCREASE':
      return {
        ...state,
        counter: state.counter + (action.payload ?? 1), 
      };
    case 'DECREASE':
      return {
        ...state,
        counter: state.counter - 1,
      };
    case 'RESET_TO_ZERO':
      return {
        ...state,
        counter: 0,
      };
    default:
      return state;
  }
}

export default function UseReducerPage() {
  const [count, setCount] = useState(0);
  const handleIncrease = () => {
    setCount(count + 1);
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="flex flex-col gap-10 p-6">
      <div>
        <h2 className="text-2xl font-bold">useState 훅 사용</h2>
        <h1 className="text-xl mt-2">Count: {count}</h1>
        <button 
          onClick={handleIncrease} 
          className="border px-4 py-2 bg-blue-500 text-white rounded mt-2"
        >
          Increase
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">useReducer 사용</h2>
        <h1 className="text-xl">Counter: {state.counter}</h1>
        <div className="flex gap-2 mt-2">
          <button 
            onClick={() => dispatch({ type: 'INCREASE', payload: 3 })} 
            className="border px-4 py-2 bg-green-500 text-white rounded"
          >
            Increase (3씩 증가)
          </button>
          <button 
            onClick={() => dispatch({ type: 'DECREASE' })} 
            className="border px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Decrease
          </button>
          <button 
            onClick={() => dispatch({ type: 'RESET_TO_ZERO' })} 
            className="border px-4 py-2 bg-red-500 text-white rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}