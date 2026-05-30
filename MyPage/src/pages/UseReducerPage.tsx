import { useReducer, useState } from "react"

interface IState {
    counter: number;
    error: string | null;
}

interface IAction {
    type: "INCREASE" | "DECREASE" | "RESET"
    payload?: number;
}

function reducer(state: IState, action: IAction) {
    const { type, payload } = action;

    switch(type) {
        case "INCREASE": {
            return {
                ...state,
                counter: payload ? state.counter + 1 + payload : state.counter + 1
            };
        }
        case "DECREASE": {
            return {
                ...state,
                counter: payload ? state.counter - 1 - payload : state.counter - 1
            };
        }
        case "RESET": {
            return {
                ...state,
                counter: 0
            };
        }
        default:
            return state;
    }
}

export default function UseReducerPage() {
    const [count, setCount] = useState(0);

    const [state, dispatch] = useReducer(reducer, {
        counter: 0,
        error: null
    });

    const handleIncrease = () => {
        setCount(count + 1);
    }
    return (
        <div className="flex gap-8 justify-center items-center w-full min-h-screen text-center">
            <div className="flex flex-col gap-2">
                <h1>UseState</h1>
                <h1 className="text-5xl">{count}</h1>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleIncrease}>Up</button>
            </div>

            <div className="flex flex-col gap-2">
                <h1>UseReducer</h1>
                <h1 className="text-5xl">{state.counter}</h1>
                <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => dispatch({
                            type: 'INCREASE',
                            payload: 3
                        })}
                    >Up</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => dispatch({
                            type: 'DECREASE'
                        })}
                    >Down</button>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => dispatch({
                            type: 'RESET'
                        })}
                    >Reset</button>
                </div>
            </div>
        </div>
    )
}