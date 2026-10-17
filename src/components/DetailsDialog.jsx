import {
  Alert, Box, Button, Chip, CircularProgress, Dialog, DialogContent, IconButton, Typography, useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import MovieIcon from "@mui/icons-material/Movie";
import StarIcon from "@mui/icons-material/Star";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { backdropUrl, posterUrl } from "../api/tmdb";
import { useFetch } from "../hooks/useFetch";
import { useWatchlist } from "../context/WatchlistContext.jsx";
import { formatDate, formatRuntime, normalizeItem } from "../utils/format";

export default function DetailsDialog({ item, open, onClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { has, toggle } = useWatchlist();

  // Fetch the full record (genres, runtime, cast, videos) for the selected title.
  const { data, loading, error, reload } = useFetch(`/${item.mediaType}/${item.id}`, {
    append_to_response: "videos,credits",
  });

  // Until the full record arrives, show what we already know from the list.
  const shown = data ? normalizeItem({ ...data, media_type: item.mediaType }, item.mediaType) : item;
  const saved = has(shown.id, shown.mediaType);
  const genres = data?.genres || [];
  const cast = (data?.credits?.cast || []).slice(0, 6).map((c) => c.name);
  const videos = data?.videos?.results || [];
  const trailer = videos.find((v) => v.site === "YouTube" && v.type === "Trailer") || videos.find((v) => v.site === "YouTube");
  const runtime =
    item.mediaType === "movie"
      ? formatRuntime(data?.runtime)
      : data?.number_of_seasons
      ? `${data.number_of_seasons} season${data.number_of_seasons > 1 ? "s" : ""}`
      : null;
  const poster = posterUrl(shown.posterPath);

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} maxWidth="md" fullWidth scroll="body" aria-labelledby="details-title">
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            position: "relative",
            height: { xs: 170, sm: 270 },
            bgcolor: "#2d1c4d",
            backgroundImage: shown.backdropPath ? `url(${backdropUrl(shown.backdropPath)})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, #221538 0%, rgba(34,21,56,0) 65%)",
            },
          }}
        >
          <IconButton
            aria-label="Close details"
            onClick={onClose}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, bgcolor: "rgba(0,0,0,.65)", "&:hover": { bgcolor: "rgba(0,0,0,.85)" } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", gap: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 }, pb: 3, mt: { xs: -7, sm: -12 }, position: "relative", zIndex: 1 }}>
          {poster ? (
            <Box
              component="img"
              src={poster}
              alt={`${shown.title} poster`}
              sx={{ flex: "none", width: { xs: 100, sm: 170 }, alignSelf: "flex-start", aspectRatio: "2 / 3", objectFit: "cover", borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,.5)" }}
            />
          ) : (
            <Box
              sx={{ flex: "none", width: { xs: 100, sm: 170 }, alignSelf: "flex-start", aspectRatio: "2 / 3", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2, bgcolor: "#2d1c4d", color: "text.secondary" }}
            >
              <MovieIcon />
            </Box>
          )}

          <Box sx={{ flex: 1, minWidth: 0, pt: { xs: 7, sm: 12 } }}>
            <Typography id="details-title" variant="h4" component="h2" sx={{ fontSize: { xs: "1.4rem", sm: "2rem" }, lineHeight: 1.1 }}>
              {shown.title}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mt: 1 }}>
              <Chip
                size="small"
                color="primary"
                icon={<StarIcon />}
                label={shown.rating ? `${shown.rating.toFixed(1)} / 10` : "Not rated"}
              />
              <Typography variant="body2" color="text.secondary">
                {formatDate(shown.date) || "Release date unknown"}
              </Typography>
              {runtime && (
                <Typography variant="body2" color="text.secondary">
                  {runtime}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ px: { xs: 2, sm: 3 }, pb: 3 }}>
          {genres.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {genres.map((g) => (
                <Chip key={g.id} size="small" variant="outlined" label={g.name} />
              ))}
            </Box>
          )}
          <Typography sx={{ maxWidth: "65ch", mb: 2 }}>
            {shown.overview || "No description available."}
          </Typography>
          {cast.length > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              <strong>Cast:</strong> {cast.join(", ")}
            </Typography>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} action={<Button color="inherit" size="small" onClick={reload}>Try again</Button>}>
              Couldn’t load full details: {error}
            </Alert>
          )}
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
            <Button
              variant="contained"
              startIcon={saved ? <BookmarkAddedIcon /> : <BookmarkAddOutlinedIcon />}
              onClick={() => toggle(shown)}
            >
              {saved ? "Remove from watchlist" : "Add to watchlist"}
            </Button>
            {trailer && (
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<PlayCircleOutlineIcon />}
                component="a"
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Official trailer on YouTube
              </Button>
            )}
            {loading && <CircularProgress size={22} aria-label="Loading details" />}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
