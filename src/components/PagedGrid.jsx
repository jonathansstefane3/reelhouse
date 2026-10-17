import { Alert, Box, Button } from "@mui/material";
import MovieGrid from "./MovieGrid.jsx";
import StateMessage from "./StateMessage.jsx";

// Shows the grid plus the loading, error, empty and "Load more" states
// for any list created by usePagedList.
export default function PagedGrid({ list, emptyMessage }) {
  const { items, loading, error, hasMore, loadMore, reload } = list;

  if (error && items.length === 0) return <StateMessage type="error" message={error} onRetry={reload} />;
  if (loading && items.length === 0) return <StateMessage type="loading" />;
  if (items.length === 0) return <StateMessage message={emptyMessage} />;

  return (
    <>
      <MovieGrid items={items} />
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {hasMore && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button variant="outlined" onClick={error ? reload : loadMore} disabled={loading}>
            {loading ? "Loading..." : error ? "Try again" : "Load more"}
          </Button>
        </Box>
      )}
    </>
  );
}
