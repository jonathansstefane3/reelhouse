// Vercel serverless proxy for TMDB. The key is read from the TMDB_API_KEY
// environment variable on Vercel and is never sent to the browser.
// The browser calls /api/tmdb?path=/movie/popular&page=1
const ALLOWED =
  /^\/(trending\/(all|movie|tv)\/(day|week)|(movie|tv)\/(popular|top_rated|upcoming|now_playing|on_the_air|airing_today|\d+)|search\/(movie|tv|multi)|discover\/(movie|tv)|genre\/(movie|tv)\/list)$/;

export default async function handler(req, res) {
  const { path = "", ...params } = req.query;
  const apiPath = Array.isArray(path) ? path[0] : path;

  if (!ALLOWED.test(apiPath)) return res.status(400).json({ error: "Path not allowed" });

  const key = process.env.TMDB_API_KEY;
  if (!key) return res.status(500).json({ error: "TMDB_API_KEY is not set on the server" });

  delete params.api_key;
  const qs = new URLSearchParams({ ...params, api_key: key, language: "en-US" });

  try {
    const upstream = await fetch(`https://api.themoviedb.org/3${apiPath}?${qs}`);
    res.setHeader("Cache-Control", "public, s-maxage=300");
    res.status(upstream.status).setHeader("Content-Type", "application/json").send(await upstream.text());
  } catch {
    res.status(502).json({ error: "Could not reach TMDB" });
  }
}
