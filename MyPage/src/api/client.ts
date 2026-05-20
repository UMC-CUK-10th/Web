import axios from 'axios';

const client = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 인터셉터 설정 : 유저 리포지토리에서 자동으로 토큰을 붙여서 요청을 날리도록 함
client.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default client