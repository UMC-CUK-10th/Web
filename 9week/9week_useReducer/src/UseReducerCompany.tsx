import { type ChangeEvent, useReducer, useState } from "react";

interface IState {
  department: string;
  error: string | null;
}

interface IAction {
  type: 'CHANGE_DEPARTMENT' | 'RESET';
  payload?: string;
}

function reducer(state: IState, action: IAction) {
  const { type, payload } = action;

  switch (type) {
    case 'CHANGE_DEPARTMENT': {
      const newDepartment = payload || '';
      const isCardMaker = newDepartment === '카드메이커';
      return {
        ...state,
        department: isCardMaker ? newDepartment : state.department,
        error: isCardMaker ? null : '거부권 행사 가능, 카드메이커만 입력 가능합니다.',
      };
    }
    default:
      return state;
  }
}

export default function UseReducerCompany() {
  const [state, dispatch] = useReducer(reducer, {
    department: 'Software Developer',
    error: null,
  });

  const [department, setDepartment] = useState('');

  const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  return (
    <div>
      <h1>{state.department}</h1>
      {state.error && <p className="text-red-400 text-2xl">{state.error}</p>}
      <input
        className='w-[600px] border mt-10 p-4 rounded-md text-black'
        placeholder='변경하고 싶은 직무를 입력해주세요.'
        value={department}
        onChange={handleChangeDepartment}
      />

      <button
        className="ml-4 p-4 bg-blue-500 text-white rounded-md"
        onClick={() =>
          dispatch({
            type: 'CHANGE_DEPARTMENT',
            payload: department,
          })
        }
      >
        직무 변경하기
      </button>
    </div>
  );
}