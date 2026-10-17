// Secure proxy for TMDB. The API key lives in the TMDB_API_KEY environment
// variable on Netlify and is never sent to the browser.
const ALLOWED =
  /^\/(trending\/(all|movie|tv)\/(day|week)|(movie|tv)\/(popular|top_rated|upcoming|now_playing|on_the_air|airing_today|\d+)|search\/(movie|tv|multi)|discover\/(movie|tv)|genre\/(movie|tv)\/list)$/;

const json = (statusCode, body, headers = {}) => ({
  statusCode,
  headers: { "Content-Type": "application/json", ...headers },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  const full = event.rawUrl ? new URL(event.rawUrl).pathname : event.path;
  const path = full.replace(/^.*\/tmdb/, "");

  if (!ALLOWED.test(path)) return json(400, { error: "Path not allowed" });

  const key = process.env.TMDB_API_KEY;
  if (!key) return json(500, { error: "TMDB_API_KEY is not set on the server" });

  const params = { ...(event.queryStringParameters || {}) };
  delete params.api_key;
  const qs = new URLSearchParams({ ...params, api_key: key, language: "en-US" });

  try {
    const res = await fetch(`https://api.themoviedb.org/3${path}?${qs}`);
    return {
      statusCode: res.status,
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=300" },
      body: await res.text(),
    };
  } catch {
    return json(502, { error: "Could not reach TMDB" });
  }
};
