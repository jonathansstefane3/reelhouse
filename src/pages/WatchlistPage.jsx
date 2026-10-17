import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import MovieGrid from "../components/MovieGrid.jsx";
import StateMessage from "../components/StateMessage.jsx";
import { useWatchlist } from "../context/WatchlistContext.jsx";
import { PAD } from "../constants";

export default function WatchlistPage() {
  const { items } = useWatchlist();
  return (
    <Box sx={{ px: PAD, py: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        My Watchlist
      </Typography>
      {items.length === 0 ? (
        <StateMessage
          message="Your watchlist is empty. Use the bookmark button on any poster to save it here."
          action={
            <Button component={RouterLink} to="/" variant="contained" sx={{ mt: 2 }}>
              Browse titles
            </Button>
          }
        />
      ) : (
        <MovieGrid items={items} />
      )}
    </Box>
  );
}
