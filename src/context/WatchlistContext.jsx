import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "reelhouse:watchlist";
const WatchlistContext = createContext(null);

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState(load);

  // Save to localStorage whenever the list changes, so it survives a refresh.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be full or blocked */
    }
  }, [items]);

  const has = useCallback(
    (id, mediaType) => items.some((i) => i.id === id && i.mediaType === mediaType),
    [items]
  );

  const toggle = useCallback((item) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === item.id && i.mediaType === item.mediaType);
      return exists
        ? prev.filter((i) => !(i.id === item.id && i.mediaType === item.mediaType))
        : [item, ...prev];
    });
  }, []);

  const value = useMemo(() => ({ items, has, toggle }), [items, has, toggle]);
  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used inside WatchlistProvider");
  return ctx;
}
