import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants/key';


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`, // 로그인 후 발급받은 accessToken을 Authorization 헤더라는 곳에 담아서 보내줘야함
    },
});