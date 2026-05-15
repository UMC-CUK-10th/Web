export default function GoogleLoginButton() {
    const handleGoogleLogin = () => {
        const url = "http://localhost:8000/v1/auth/google/login"
        window.location.href = url;
    }
    return (
        <button className="
            flex items-center 
            border border-gray-300 bg-white
            text-gray-700 font-medium
            px-6 py-3 rounded-3xl
            hover:bg-gray-50 hover:shadow-md
            active:bg-gray-100
            transition-all duration-200"
            onClick={handleGoogleLogin}
        >
            <span>Google 계정으로 로그인</span>
        </button>
    )
}