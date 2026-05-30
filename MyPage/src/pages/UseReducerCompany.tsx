import { useReducer, useState, type ChangeEvent } from "react";

type TActionType = "CHANGE_DEVELOPMENT" | "RESET";

interface IState {
    department: string;
    error: string | null;
}

interface IAction {
    type: TActionType;
    payload?: string;
}

function reducer(state: IState, action: IAction) {
    const { type, payload } = action;
    
    switch(type) {
        case "CHANGE_DEVELOPMENT":
            const newDepartment = payload;
            const hasError = newDepartment !== "카드메이커";
            return {
                ...state,
                department: hasError ? state.department : newDepartment,
                error: hasError
                    ? "거부권 행사가능, '카드메이커'만 입력 가능합니다."
                    : null
            }
        default:
            return state;
    }
}

export default function UseReducerCompany() {
    const [state, dispatch] = useReducer(reducer, {
        department: 'SD',
        error: null
    })

    const [department, setDepartment] = useState("");

    const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>) => {
        setDepartment(e.target.value)
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full min-h-screen">
            <h1 className="text-5xl">{state.department}</h1>
            {state.error && <p className="text-red-500">{state.error}</p>}
            <input
                className="w-[500px] px-4 py-2 border rounded-lg"
                placeholder="직무를 입력하세요"
                value={department}
                onChange={handleChangeDepartment}
            />
            <button
                className="
                    bg-blue-500
                    px-4 py-2
                    rounded-lg
                    text-white
                    cursor-pointer
                    border border-gray-300
                    hover:bg-blue-600 transition
                "
                onClick={() => dispatch({
                    type: "CHANGE_DEVELOPMENT",
                    payload: department
                })}
            >직무 변경하기</button>
        </div>
    )
}