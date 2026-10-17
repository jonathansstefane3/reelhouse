import { Box } from "@mui/material";
import MovieCard from "./MovieCard.jsx";
import { itemKey } from "../utils/format";

export default function MovieGrid({ items }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(auto-fill, minmax(120px, 1fr))",
          sm: "repeat(auto-fill, minmax(150px, 1fr))",
          md: "repeat(auto-fill, minmax(170px, 1fr))",
        },
        gap: { xs: 1.5, sm: 2.5 },
      }}
    >
      {items.map((item) => (
        <MovieCard key={itemKey(item)} item={item} />
      ))}
    </Box>
  );
}
