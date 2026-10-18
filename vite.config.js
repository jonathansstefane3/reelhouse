import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// The TMDB key is read here, on the dev server, and added to the request.
// It is never bundled into the browser code. In production the same job is done
// by the serverless function api/tmdb.js.
function tmdbProxy(key) {
  return {
    "/api/tmdb": {
      target: "https://api.themoviedb.org",
      changeOrigin: true,
      rewrite: (path) => {
        const url = new URL(path, "http://local");
        const apiPath = url.searchParams.get("path") || "";
        url.searchParams.delete("path");
        url.searchParams.delete("api_key");
        url.searchParams.set("api_key", key);
        url.searchParams.set("language", "en-US");
        return `/3${apiPath}?${url.searchParams}`;
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxy = tmdbProxy(env.TMDB_API_KEY || "");
  return {
    plugins: [react()],
    server: { proxy },
    preview: { proxy },
  };
});
