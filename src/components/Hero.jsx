import { Box, Button, Skeleton, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { backdropUrl } from "../api/tmdb";
import { useWatchlist } from "../context/WatchlistContext.jsx";
import { useDetails } from "../context/DetailsContext.jsx";
import { PAD } from "../constants";

export default function Hero({ items, loading }) {
  const { has, toggle } = useWatchlist();
  const { openDetails } = useDetails();
  const featured = items.find((i) => i.backdropPath);

  if (loading) return <Skeleton variant="rectangular" sx={{ height: { xs: 320, md: 440 }, mb: 4 }} />;
  if (!featured) return null;
  const saved = has(featured.id, featured.mediaType);

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 320, md: 440 },
        mb: 4,
        display: "flex",
        alignItems: "flex-end",
        px: PAD,
        pb: { xs: 3, md: 5 },
        backgroundImage: `url(${backdropUrl(featured.backdropPath, "w1280")})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, #150d26 6%, rgba(21,13,38,.6) 50%, rgba(21,13,38,.15))",
        },
      }}
    >
      <Box sx={{ position: "relative", maxWidth: 620 }}>
        <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          {featured.mediaType === "tv" ? "TV show" : "Movie"}
          {featured.year && <span>{featured.year}</span>}
          {featured.rating && (
            <Box component="span" sx={{ display: "inline-flex", alignItems: "center", color: "primary.main" }}>
              <StarIcon sx={{ fontSize: 16, mr: 0.25 }} />
              {featured.rating.toFixed(1)}
            </Box>
          )}
        </Typography>
        <Typography variant="h3" component="h1" sx={{ fontSize: { xs: "1.9rem", md: "3rem" }, lineHeight: 1.05, mb: 1 }}>
          {featured.title}
        </Typography>
        <Typography
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            color: "#e0d6ee",
          }}
        >
          {featured.overview || "No description available."}
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button variant="contained" onClick={() => openDetails(featured)}>
            View details
          </Button>
          <Button variant="outlined" color="inherit" onClick={() => toggle(featured)}>
            {saved ? "Remove from watchlist" : "Add to watchlist"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
