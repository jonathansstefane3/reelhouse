import { Box } from "@mui/material";
import Hero from "../components/Hero.jsx";
import ContentRow from "../components/ContentRow.jsx";
import RemoteRow from "../components/RemoteRow.jsx";
import { useMediaList } from "../hooks/useMediaList";

export default function HomePage() {
  // Trending feeds both the hero banner and the first row, so it is fetched once.
  const trending = useMediaList("/trending/all/week", {}, "movie");

  return (
    <Box>
      <Hero items={trending.items} loading={trending.loading} />
      <ContentRow title="Trending this week" {...trending} />
      <RemoteRow title="Popular movies" path="/movie/popular" mediaType="movie" />
      <RemoteRow
        title="Action movies"
        path="/discover/movie"
        params={{ with_genres: "28", sort_by: "popularity.desc" }}
        mediaType="movie"
      />
      <RemoteRow title="Popular TV shows" path="/tv/popular" mediaType="tv" />
      <RemoteRow title="Top rated movies" path="/movie/top_rated" mediaType="movie" />
    </Box>
  );
}
