import { useState, type ChangeEvent } from "react";

interface useFormProps<T> {
    initialValue: T; //{ email: '', password: '' } 이런 식의 값이 들어감
    //값이 올바른지 검증하는 함수
    validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: useFormProps<T>) {
    const [values, setValues] = useState(initialValue);
    const [touched, setTouched] = useState<Record<string, boolean>>(); //스트링 받아서 touched 여부에 따라 boolean 값 출력
    const errors = validate(values); //입력한 값에서 @가 없거나 하면 에러 메시지 출력

    //사용자가 입력값 바꿀 때 실행되는 값
    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values, //기존 입력값 유지(불변성 유지)
            [name]: text
        });
    };

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true,
        });
    };

    //이메일 인풋, 패스워드 인풋, 속성들을 가져오는 것
    const getInputProps = (name: keyof T) => {
        const value = values[name];
        const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => handleChange(name, e.target.value);

        const onBlur = () => handleBlur(name);

        return {value, onChange, onBlur};
    };
    
    // values가 변경될 때 마다 에러 검증 로직이 실행됨

    return { values, errors, touched, getInputProps };

}

export default useForm;
