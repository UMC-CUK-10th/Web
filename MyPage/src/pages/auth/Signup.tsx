import GoogleLoginButton from "../../components/GoogleLoginButton";

export default function Signup() {
    return (
        <div className="flex flex-col items-center justify-center mt-30">
            <h1 className="text-3xl font-bold mb-6">회원가입</h1>
            
            <GoogleLoginButton/>
        </div>
    );
}