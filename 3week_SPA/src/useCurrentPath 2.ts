import { useState, useEffect } from "react";

export const useCurrentPath = () => {

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    
    window.addEventListener("pushState_event", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pushstate_event", handleLocationChange);
    };
  }, []);

  return path;
};