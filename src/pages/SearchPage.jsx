import { useSearchParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import PagedGrid from "../components/PagedGrid.jsx";
import StateMessage from "../components/StateMessage.jsx";
import { usePagedList } from "../hooks/usePagedList";
import { PAD } from "../constants";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = (params.get("q") || "").trim();
  const list = usePagedList(query ? "/search/multi" : null, { query, include_adult: "false" }, "multi");

  return (
    <Box sx={{ px: PAD, py: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        {query ? `Results for “${query}”` : "Search"}
      </Typography>
      {query ? (
        <PagedGrid list={list} emptyMessage={`No matches for “${query}”. Check the spelling or try another title.`} />
      ) : (
        <StateMessage message="Type a movie or TV show title in the search box." />
      )}
    </Box>
  );
}
