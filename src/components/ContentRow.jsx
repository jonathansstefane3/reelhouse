import { Box, Skeleton, Typography } from "@mui/material";
import MovieCard from "./MovieCard.jsx";
import StateMessage from "./StateMessage.jsx";
import { CARD_WIDTH, PAD } from "../constants";
import { itemKey } from "../utils/format";

function Scroller({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 1.5, sm: 2 },
        overflowX: "auto",
        px: PAD,
        pb: 1.5,
        scrollSnapType: "x proximity",
      }}
    >
      {children}
    </Box>
  );
}

// A titled, horizontally scrolling row of posters.
export default function ContentRow({ title, items = [], loading, error, reload }) {
  let body;
  if (error) {
    body = (
      <Box sx={{ px: PAD }}>
        <StateMessage type="error" message={error} onRetry={reload} />
      </Box>
    );
  } else if (loading) {
    body = (
      <Scroller>
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" sx={{ flex: "none", width: CARD_WIDTH, aspectRatio: "2 / 3.6" }} />
        ))}
      </Scroller>
    );
  } else if (items.length === 0) {
    body = <StateMessage message="Nothing to show here right now." />;
  } else {
    body = (
      <Scroller>
        {items.map((item) => (
          <Box key={itemKey(item)} sx={{ flex: "none", width: CARD_WIDTH, scrollSnapAlign: "start" }}>
            <MovieCard item={item} />
          </Box>
        ))}
      </Scroller>
    );
  }

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2" sx={{ px: PAD, mb: 1.5 }}>
        {title}
      </Typography>
      {body}
    </Box>
  );
}
