export const navigate = (to: string) => {
  window.history.pushState({}, "", to);
  const navEvent = new PopStateEvent("popstate");
  window.dispatchEvent(navEvent);
};