import { useState } from "react";
import { Box, Typography } from "@mui/material";
import GenreFilter from "../components/GenreFilter.jsx";
import PagedGrid from "../components/PagedGrid.jsx";
import { useFetch } from "../hooks/useFetch";
import { usePagedList } from "../hooks/usePagedList";
import { PAD } from "../constants";

// Shared by the Movies page (type = "movie") and the TV Shows page (type = "tv").
export default function BrowsePage({ type, title }) {
  const [genre, setGenre] = useState(null);
  const genres = useFetch(`/genre/${type}/list`);

  // No genre selected: popular titles. Genre selected: discover by that genre.
  const list = usePagedList(
    genre ? `/discover/${type}` : `/${type}/popular`,
    genre ? { with_genres: String(genre), sort_by: "popularity.desc", "vote_count.gte": "50" } : {},
    type
  );

  return (
    <Box sx={{ px: PAD, py: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <GenreFilter genres={genres.data?.genres} value={genre} onChange={setGenre} />
      <PagedGrid list={list} emptyMessage="No titles found for this genre." />
    </Box>
  );
}
