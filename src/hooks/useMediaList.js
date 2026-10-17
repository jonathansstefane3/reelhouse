import { useMemo } from "react";
import { useFetch } from "./useFetch";
import { normalizeItem } from "../utils/format";

// One page of results, normalised, for the rows on the homepage.
export function useMediaList(path, params, mediaType) {
  const { data, loading, error, reload } = useFetch(path, params);
  const items = useMemo(
    () => (data?.results || []).filter((r) => r.media_type !== "person").map((r) => normalizeItem(r, mediaType)),
    [data, mediaType]
  );
  return { items, loading, error, reload };
}
