export default function GoogleLoginBtn() {
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8000/v1/auth/google/login";
    };

    return (
        <button 
            className="
                group
                flex items-center justify-center gap-3
                w-full h-12
                bg-white border border-gray-300
                rounded-lg px-4 cursor-pointer
                text-gray-700 font-medium
                transition-all duration-200 ease-in-out
                hover:bg-gray-50 hover:border-gray-400 hover hover:shadow-md hover:-translate-y-0.5
                active:scale-95 active:shadow-inner
                focus:outline-none focus:ring-2 focus:ring-gray-200
                mb-4
            " 
            onClick={ handleGoogleLogin }
        >Google로 시작하기</button>
    )
}