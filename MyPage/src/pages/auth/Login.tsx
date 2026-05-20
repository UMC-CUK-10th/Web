import GoogleLoginButton from "../../components/GoogleLoginButton"

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center mt-30">
            <h1 className="text-3xl font-bold mb-6">로그인</h1>
                
            <GoogleLoginButton/>
        </div>
    )
}