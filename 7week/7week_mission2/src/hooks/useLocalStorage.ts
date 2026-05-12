export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      // ✅ 핵심 수정: value가 문자열이면 JSON.stringify를 하지 않습니다.
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

      // ✅ 가져올 때도 우선 JSON.parse를 시도하되, 실패하면(순수 문자열이면) 그대로 반환합니다.
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