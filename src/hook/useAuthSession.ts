import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { useAppDispatch } from "../store";
import { setAuth } from "../store/authSlice";
import { getItem, removeItem } from "../utils/mmkv";
import { getMe } from "../api/auth";

const INACTIVITY_TIMEOUT = 10000;

export function useAuthSession() {
  const dispatch = useAppDispatch();
  const [locked, setLocked] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const inactivityRef = useRef<NodeJS.Timeout | null>(null);

  // Check stored token on app launch
  useEffect(() => {
    (async () => {
      const stored = getItem("token");
      if (stored) {
        // setLocked(true); 
        try {
          const me = await getMe(stored);
          dispatch(
            setAuth({ token: stored, username: me.username, isSuperAdmin: me.isSuperAdmin })
          );
          setToken(stored);
        } catch {
          removeItem("token");
        }
      }
    })();
  }, []);

  // Lock on background
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state !== "active") setLocked(true);
    });
    return () => sub.remove();
  }, []);

  // reset timer
  const resetTimer = (currentScreen?: string) => {
    if (currentScreen === "Login") return; 
    if (inactivityRef.current) clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(() => setLocked(true), INACTIVITY_TIMEOUT);
  };

  // handle unlock
  const handleUnlock = () => {
    setLocked(false);
    resetTimer();
  };

  return { token, locked, setLocked, resetTimer, handleUnlock };
}
