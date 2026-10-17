import { useState } from "react";
import { Box, Card, CardActionArea, CardContent, IconButton, Tooltip, Typography } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import StarIcon from "@mui/icons-material/Star";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { posterUrl } from "../api/tmdb";
import { useWatchlist } from "../context/WatchlistContext.jsx";
import { useDetails } from "../context/DetailsContext.jsx";

export default function MovieCard({ item }) {
  const { has, toggle } = useWatchlist();
  const { openDetails } = useDetails();
  const [imgFailed, setImgFailed] = useState(false);
  const saved = has(item.id, item.mediaType);
  const src = posterUrl(item.posterPath);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Card
        sx={{
          height: "100%",
          transition: "transform .18s ease, box-shadow .18s ease",
          "&:hover": { transform: "translateY(-4px)", boxShadow: "0 10px 24px rgba(0,0,0,.45)" },
        }}
      >
        <CardActionArea onClick={() => openDetails(item)} aria-label={`View details for ${item.title}`}>
          {src && !imgFailed ? (
            <Box
              component="img"
              src={src}
              alt={`${item.title} poster`}
              loading="lazy"
              onError={() => setImgFailed(true)}
              sx={{ display: "block", width: "100%", aspectRatio: "2 / 3", objectFit: "cover" }}
            />
          ) : (
            <Box
              sx={{
                aspectRatio: "2 / 3",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                p: 1.5,
                textAlign: "center",
                bgcolor: "#2d1c4d",
                color: "text.secondary",
              }}
            >
              <MovieIcon />
              <Typography variant="caption">No poster available</Typography>
            </Box>
          )}
          <CardContent sx={{ p: 1.25, "&:last-child": { pb: 1.25 } }}>
            <Typography variant="body2" fontWeight={700} noWrap title={item.title}>
              {item.title}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.25 }}>
              <Typography variant="caption" color="text.secondary">
                {item.year || "Date unknown"}
              </Typography>
              {item.rating && (
                <Typography variant="caption" sx={{ display: "flex", alignItems: "center", color: "primary.main" }}>
                  <StarIcon sx={{ fontSize: 14, mr: 0.25 }} />
                  {item.rating.toFixed(1)}
                </Typography>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <Tooltip title={saved ? "Remove from watchlist" : "Add to watchlist"}>
        <IconButton
          size="small"
          aria-label={saved ? `Remove ${item.title} from watchlist` : `Add ${item.title} to watchlist`}
          onClick={() => toggle(item)}
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            bgcolor: "rgba(0,0,0,.65)",
            color: saved ? "primary.main" : "common.white",
            "&:hover": { bgcolor: "rgba(0,0,0,.85)" },
          }}
        >
          {saved ? <BookmarkAddedIcon fontSize="small" /> : <BookmarkAddOutlinedIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
