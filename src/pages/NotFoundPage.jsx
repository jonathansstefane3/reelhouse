import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { PAD } from "../constants";

export default function NotFoundPage() {
  return (
    <Box sx={{ px: PAD, py: 6, textAlign: "center" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
        Page not found
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        The page you opened doesn’t exist.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained">
        Go to Home
      </Button>
    </Box>
  );
}
