import React, { useState, useReducer } from 'react';

interface IState {
  department: string;
  error: string | null;
}

type TAction = {
  type: 'CHANGE_DEPARTMENT';
  payload: string;
};

const initialState: IState = {
  department: 'Software Developer',
  error: null,
};

function reducer(state: IState, action: TAction): IState {
  const { type, payload } = action;

  switch (type) {
    case 'CHANGE_DEPARTMENT': {
      const newDept = payload;
      const hasError = newDept !== '카드 메이커';

      return {
        ...state,
        department: hasError ? state.department : newDept,
        error: hasError ? '카드 메이커만 입력 가능합니다.' : null,
      };
    }
    default:
      return state;
  }
}

export default function UseReducerCompany() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [department, setDepartment] = useState('');

  const handleChangeDepartment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  return (
    <div className="p-6 max-w-[600px] mx-auto mt-10 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">현재 직무: {state.department}</h1>
      
      {state.error && (
        <p className="text-red-500 text-xl font-semibold mb-4">
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={department}
          onChange={handleChangeDepartment}
          placeholder="변경하시고 싶은 직무를 입력해 주세요 단 거부권 행사 가능"
          className="border p-2 w-full rounded"
        />
        <button
          onClick={() => dispatch({ type: 'CHANGE_DEPARTMENT', payload: department })}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          직무 변경하기
        </button>
      </div>
    </div>
  );
}