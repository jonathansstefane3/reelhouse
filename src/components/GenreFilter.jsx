import { Box, Chip } from "@mui/material";

// Chips for filtering by genre. value = selected genre id, or null for "All".
export default function GenreFilter({ genres, value, onChange }) {
  if (!genres || genres.length === 0) return null;
  return (
    <Box role="group" aria-label="Filter by genre" sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1, mb: 3 }}>
      <Chip
        label="All"
        clickable
        color={value === null ? "primary" : "default"}
        variant={value === null ? "filled" : "outlined"}
        onClick={() => onChange(null)}
      />
      {genres.map((g) => (
        <Chip
          key={g.id}
          label={g.name}
          clickable
          color={value === g.id ? "primary" : "default"}
          variant={value === g.id ? "filled" : "outlined"}
          onClick={() => onChange(g.id)}
          sx={{ flex: "none" }}
        />
      ))}
    </Box>
  );
}
