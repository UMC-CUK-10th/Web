import { createContext, useContext, useState } from "react";

// erasableSyntaxOnly -> 이게 선언되어있으면 에러 발생
// ts 를 js 로 변환하는 과정에서 완전히 사라지는 것들을 erasable 문법이라 함.
// 대표적으로 interface, type 등이 erasable 에 속함.
// import {ReactNode} 라고 선언하면, ts 는 이게 js 상에 남겨야하는 값인지, 사라져도 되는 값인지 모름
// erasableSyntaxOnly 은 이렇게 애매한 것들은 허용하지 않는다는 구문임.
// 이 오류를 해결하는 방법은 ReactNode 가 무엇인지 확실하게 만드는 것임.
// 따라서 ReactNode 앞에 type 을 붙여서 js 변환 시 사라져도 무방한 놈이라고 명시하면 됨.
import type {ReactNode} from 'react';

interface CounterContextType {
    count: number;
    handleIncrement: () => void;
    handleDecrement: () => void;
}

export const CounterContext = createContext<CounterContextType | undefined>(
    undefined
);

export const CounterProvider = ({ children }: {children: ReactNode}) => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => setCount((prev) => prev + 1);
    const handleDecrement = () => setCount((prev) => prev - 1);

    return(
        <CounterContext.Provider
            value={{ count, handleIncrement, handleDecrement }}
        >
            {children}
        </CounterContext.Provider>
    )
}