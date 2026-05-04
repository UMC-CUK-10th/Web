export const useLocalStorage = (key: string) => {
    const setItem = (value: string) => {
        window.localStorage.setItem(key, value);
    };

    const getItem = () => {
        const item = window.localStorage.getItem(key);
        return item ? item : null;
    };

    const removeItem = () => {
        window.localStorage.removeItem(key);
    };

    return { setItem, getItem, removeItem };
};