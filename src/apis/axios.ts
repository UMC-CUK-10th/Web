import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; //요청 재시도 여부를 알려주는 플래그
}

//전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청 방지
let refreshPromise: Promise<string> | null = null;


export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

//요청 인터셉터, 모든 요청 전에 accessToken을 Athorization 헤더에 자동으로 추가
axiosInstance.interceptors.request.use((config) => {
  const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const accessToken = getItem(); //localStorage에서 accessToken을 가져옴

  //accessToken이 존재하면 요청 헤더에 Bearer 토큰 형식으로 추가
  if ( accessToken ) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`; //헤더에 accessToken을 추가
  }

  //수정된 요청 설정을 반환함
  return config;
  },

  //요청 인터셉터가 실패하면 에러를 뿜는다.
  (error) => Promise.reject(error),
);

//응답 인터셉터: 401 에러 발생 -> refresh 토큰을 통한 토큰 갱신을 처리함
axiosInstance.interceptors.response.use(
  (response) => response, //응답이 성공적이면 정상 응답 그대로 반환
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config; //실패한 요청의 설정을 가져옴

    //401 에러이면서, 아직 재시도하지 않은 요청인 경우에만 토큰 갱신 시도
    if (error.response && 
      error.response.status === 401 && 
      originalRequest._retry
    ){
      //이미 refresh 요청이 진행 중인 경우, 기존 refreshPromise를 반환하여 중복 요청 방지
      //refresh 엔드포인트에서 401 에러가 발생한경우 (Unauthorized), 중복 재시도 방지를 위해 로그아웃 처리함
      if (originalRequest.url === "/auth/refresh") {
        const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
        
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login"; //로그인 페이지로 리다이렉트
        return Promise.reject(error);
      }
    }

    //재시도 플래그 설정
    originalRequest._retry = true; //재시도 여부를 나타내는 플래그를 설정하여 무한 루프 방지

  )
