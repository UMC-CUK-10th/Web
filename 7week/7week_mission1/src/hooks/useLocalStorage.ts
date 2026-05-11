// src/hooks/useLocalStorage.ts

export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      // ✅ 값 자체가 문자열이면 그대로 저장, 아니면 JSON화
      const stringValue = typeof value === "string" ? value : JSON.stringify(value);
      window.localStorage.setItem(key, stringValue);
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return null;

      return item.replace(/^"|"$/g, "");
    } catch (e) {
      console.log(e);
      return null;
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