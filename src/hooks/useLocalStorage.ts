export const useLocalStorage = (key: string) => {
    const setItem = (value: unknown) => {
        try {
        window.localStorage.setItem(key, JSON.stringify(value)); //밸류는 그냥 넣는것보다 JSON.stringify로 문자열로 바꿔서 넣는게 좋음
        } catch (error) {
            console.log(error);
        }
    };

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key);
            
            return item ? JSON.parse(item) : null; //가져올 때는 JSON.parse로 다시 원래 형태로 바꿔주기
        } catch (e) {
            console.log(e);
        }
    };

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    };

    return { setItem, getItem, removeItem };
};
