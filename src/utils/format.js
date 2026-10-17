// Movies use title/release_date, TV shows use name/first_air_date.
// This turns both into one shape so components stay simple.
export function normalizeItem(raw, fallbackType = "movie") {
  const mediaType =
    raw.media_type === "tv" || raw.media_type === "movie"
      ? raw.media_type
      : fallbackType === "tv"
      ? "tv"
      : "movie";
  const date = raw.release_date || raw.first_air_date || "";
  return {
    id: raw.id,
    mediaType,
    title: raw.title || raw.name || "Untitled",
    posterPath: raw.poster_path || null,
    backdropPath: raw.backdrop_path || null,
    date,
    year: date ? date.slice(0, 4) : "",
    rating: typeof raw.vote_average === "number" && raw.vote_average > 0 ? raw.vote_average : null,
    overview: raw.overview || "",
  };
}

export const itemKey = (item) => `${item.mediaType}-${item.id}`;

export function formatDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function formatRuntime(minutes) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}
