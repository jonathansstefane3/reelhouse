import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";

// One place for the three non-happy states: loading, error and empty.
export default function StateMessage({ type = "empty", message, onRetry, action }) {
  if (type === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress aria-label="Loading" />
      </Box>
    );
  }
  if (type === "error") {
    return (
      <Alert
        severity="error"
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              Try again
            </Button>
          )
        }
      >
        {message || "Something went wrong while loading this content."}
      </Alert>
    );
  }
  return (
    <Box sx={{ textAlign: "center", py: 6, color: "text.secondary" }}>
      <Typography>{message}</Typography>
      {action}
    </Box>
  );
}
