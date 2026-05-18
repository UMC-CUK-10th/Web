export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      const stringValue = typeof value === "string" ? value : JSON.stringify(value);
      window.localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`LocalStorage 저장 에러 (${key}):`, error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return null;

      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (e) {
      return window.localStorage.getItem(key);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`LocalStorage 삭제 에러 (${key}):`, error);
    }
  };

  return { setItem, getItem, removeItem };
};