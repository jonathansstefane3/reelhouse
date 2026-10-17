import { useEffect, useState, useCallback } from "react";
import { tmdb } from "../api/tmdb";

// Loads one API endpoint. Pass path = null to skip the request.
export function useFetch(path, params) {
  const [state, setState] = useState({ data: null, loading: Boolean(path), error: null });
  const [tick, setTick] = useState(0);
  const key = JSON.stringify([path, params, tick]);

  useEffect(() => {
    if (!path) {
      setState({ data: null, loading: false, error: null });
      return undefined;
    }
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });
    tmdb(path, params, controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setState({ data: null, loading: false, error: err.message });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const reload = useCallback(() => setTick((t) => t + 1), []);
  return { ...state, reload };
}
