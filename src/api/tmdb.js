// All requests go to /api/tmdb?path=... which is handled by the Vite dev proxy locally
// and by a serverless function (api/tmdb.js) in production. The API key is added on the server side.
const BASE = "/api/tmdb";
const IMG = "https://image.tmdb.org/t/p/";

export async function tmdb(path, params = {}, signal) {
  const qs = new URLSearchParams({ path, ...params }).toString();
  const res = await fetch(`${BASE}?${qs}`, { signal });
  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      message = body.error || body.status_message || message;
    } catch {
      /* response was not JSON */
    }
    throw new Error(message || `Request failed (${res.status})`);
  }
  return res.json();
}

export const posterUrl = (path, size = "w342") => (path ? `${IMG}${size}${path}` : null);
export const backdropUrl = (path, size = "w780") => (path ? `${IMG}${size}${path}` : null);
