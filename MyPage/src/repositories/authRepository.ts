import client from "../api/client";

const authRepository = {
    loginWithGoogle: () => {
        window.location.href = `${client.defaults.baseURL}/v1/auth/google/login`
    },
    saveTokens: (accessToken: string, refreshToken: string) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    },
    removeTokens: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
}

export default authRepository;