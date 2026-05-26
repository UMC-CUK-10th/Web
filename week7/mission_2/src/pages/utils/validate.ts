export type UserSigninInformation = {
    email: string;
    password: string;
};

function validateUser(values: UserSigninInformation){
    const errors = {
        email:"",
        password: "",
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(values.email)){
        errors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if(!(values.password.length>=6 && values.password.length<20)){
        errors.password = '비밀번호를 6~20자 사이로 입력해주세요';
    }

    return errors;
}

function validateSignin(values: UserSigninInformation ){
    return validateUser(values);
}

export {validateSignin};