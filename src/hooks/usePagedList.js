import { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";
import { normalizeItem, itemKey } from "../utils/format";

// Paginated results ("Load more") used by Movies, TV Shows and Search.
// Pass path = null to skip the request.
export function usePagedList(path, params, mediaType) {
  const key = JSON.stringify([path, params, mediaType]);
  const [req, setReq] = useState({ key, page: 1 });
  if (req.key !== key) setReq({ key, page: 1 }); // new search or filter: back to page 1
  const page = req.key === key ? req.page : 1;

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(Boolean(path));
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!path) {
      setItems([]);
      setTotalPages(1);
      setLoading(false);
      setError(null);
      return undefined;
    }
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    if (page === 1) setItems([]);

    tmdb(path, { ...params, page: String(page) }, controller.signal)
      .then((res) => {
        const next = (res.results || [])
          .filter((r) => r.media_type !== "person")
          .map((r) => normalizeItem(r, mediaType));
        setItems((prev) => {
          if (page === 1) return next;
          const seen = new Set(prev.map(itemKey));
          return [...prev, ...next.filter((i) => !seen.has(itemKey(i)))];
        });
        setTotalPages(Math.min(res.total_pages || 1, 500));
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, page, tick]);

  return {
    items,
    loading,
    error,
    hasMore: page < totalPages,
    loadMore: () => setReq((r) => (r.key === key ? { ...r, page: r.page + 1 } : r)),
    reload: () => setTick((t) => t + 1),
  };
}
